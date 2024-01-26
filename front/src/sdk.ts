import { ethers, Eip1193Provider, parseUnits, ContractTransactionResponse, ContractTransactionReceipt } from "ethers";
import { erc20Abi } from "./erc20";

export class Sdk {
  provider: ethers.BrowserProvider;
  erc20Abi: any[];
  erc20Address: string;
  erc20: ethers.Contract;

  constructor(ethereum: Eip1193Provider, erc20Address: string) {
    this.provider = new ethers.BrowserProvider(ethereum);
    this.erc20Abi = erc20Abi;
    this.erc20Address = erc20Address;    
  }


  async connectMetamask(): Promise<string[]> {
    const signer = await this.provider.getSigner();
    this.erc20 = new ethers.Contract(this.erc20Address, erc20Abi, signer);
    return this.provider.send("eth_requestAccounts", []);
  }

  async getTokenData(): Promise<{
    name: string;
    symbol: string;
    totalSupply: string;
  }> {
    const name = await this.erc20.name();
    const symbol = await this.erc20.symbol();
    const totalSupply = await this.erc20.totalSupply();
    return { name, symbol, totalSupply };
  }

  async getUserBalance(userAddress: string): Promise<string> {
    return this.erc20.balanceOf(userAddress);
  }

  async mintTokens(account: string, amount: string): Promise<ContractTransactionReceipt | null> {
    const amountWei = parseUnits(amount, 18);
    const tx: ContractTransactionResponse = await this.erc20.mint(account, amountWei);
    return await tx.wait()
  }
}
