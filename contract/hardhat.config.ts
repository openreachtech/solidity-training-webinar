import 'dotenv/config';
import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "hardhat-deploy";

const DEPLOYER_KEY: string = process.env.DEPLOYER_KEY || "0000000000000000000000000000000000000000000000000000000000000000";
const ETHERSCAN_API_KEY: string = process.env.ETHERSCAN_API_KEY || "";

const config: HardhatUserConfig = {
  defaultNetwork: "hardhat",
  networks: {
    hardhat: {
      accounts: {
        count: 10
      }
    },
    sepolia: {
      url: "https://sepolia.infura.io/v3/834ee3cd0de74c5390af0f8718a43cbc",
      accounts: [DEPLOYER_KEY]
    },
    mainnet: {
      url: "https://mainnet.infura.io/v3/834ee3cd0de74c5390af0f8718a43cbc",
      accounts: [DEPLOYER_KEY]
    }
  },
  namedAccounts: {
		deployer: 0
	},
  etherscan: {
    apiKey: ETHERSCAN_API_KEY,
  },
  solidity: {
    version: "0.8.20",
    settings: {
      optimizer: {
        enabled: true,
        runs: 1000
      }
    }
  },
  mocha: {
    timeout: 60000 // 1min
  }
};

export default config;
