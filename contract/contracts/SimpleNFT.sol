//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.20;

import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import {ERC721} from "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import {ERC721URIStorage} from "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

// TokenURIを返すための関数を追加したERC721
// TotalSupplyも記録する
contract SimpleNFT is ERC721URIStorage, Ownable {
    // トークンの総発行枚数を保持する変数
    uint256 private _tokenCount = 0;

    constructor(string memory name_, string memory symbol_) ERC721(name_, symbol_) Ownable(msg.sender) {}

    // 総発行枚数を返す関数
    function totalSupply() external view returns (uint256) {
        return _tokenCount;
    }

    // NFTを発行する関数
    // ownerだけが新規発行できる
    function mint(address to, uint256 tokenId, string memory uri) public onlyOwner {
        // 総発行枚数をインクリメント
        _tokenCount += 1;
        // NFTを発行
        _mint(to, tokenId);
        // TokenURIをセット
        _setTokenURI(tokenId, uri);
    }

    // TokenURLの先頭の文字列
    function _baseURI() internal view override returns (string memory) {
        return string.concat(name(), "|");
    }
}
