//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.20;

import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract ERC20Capped is ERC20, Ownable {
    uint256 private immutable _CAP;

    constructor(
        string memory name_,
        string memory symbol_,
        uint256 cap_
    ) payable ERC20(name_, symbol_) Ownable(msg.sender) {
        require(cap_ > 0, "ERC20Capped: cap is 0");
        _CAP = cap_ * 10 ** decimals();
    }

    function cap() public view virtual returns (uint256) {
        return _CAP;
    }

    function mint(address account, uint256 amount) public onlyOwner {
        require(totalSupply() + amount <= _CAP, "ERC20Capped: cap exceeded");
        _mint(account, amount);
    }
}
