import {
  ethers,
  Eip1193Provider,
  ContractTransactionResponse,
  ContractTransactionReceipt,
} from "ethers";
import { nftAbi } from "./nft";

export class Sdk {
  provider: ethers.BrowserProvider;
  nftAbi: any[];
  nftAddress: string;
  nft: ethers.Contract;

  constructor(ethereum: Eip1193Provider, nftAddress: string) {
    this.provider = new ethers.BrowserProvider(ethereum);
    this.nftAbi = nftAbi;
    this.nftAddress = nftAddress;
  }

  async connectMetamask(): Promise<string[]> {
    const signer = await this.provider.getSigner();
    this.nft = new ethers.Contract(this.nftAddress, nftAbi, signer);
    return this.provider.send("eth_requestAccounts", []);
  }

  async getTokenData(): Promise<{
    name: string;
    symbol: string;
    totalSupply: string;
  }> {
    const name = await this.nft.name();
    const symbol = await this.nft.symbol();
    const totalSupply = await this.nft.totalSupply();
    return { name, symbol, totalSupply };
  }

  async getUserBalance(userAddress: string): Promise<string> {
    return this.nft.balanceOf(userAddress);
  }

  async getTokenURI(tokenId: number): Promise<string> {
    return this.nft.tokenURI(tokenId);
  }

  async mintNFT(
    to: string,
    tokenId: number,
    tokenURI: string,
  ): Promise<ContractTransactionReceipt | null> {
    const tx: ContractTransactionResponse = await this.nft.mint(
      to,
      tokenId,
      tokenURI,
    );
    return await tx.wait();
  }
}
