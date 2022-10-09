import { HardhatUserConfig } from "hardhat/config";
import "@nomiclabs/hardhat-ethers";
import "@nomiclabs/hardhat-etherscan";
import "@nomicfoundation/hardhat-chai-matchers";
import "@nomicfoundation/hardhat-toolbox";
import * as dotenv from "dotenv";

dotenv.config();

const EMPTY_PRIVATE_KEY="0x00000000000000000";

const {
  DEPLOYER_PRIVATE_KEY,
  ETHERSCAN_API_KEY,
  ALCHEMY_API_KEY
} = process.env;

const config: HardhatUserConfig = {
  solidity: "0.8.7",  
  etherscan: {
    apiKey: ETHERSCAN_API_KEY
  },
  networks: {
    hardhat: {
      chainId: 1337
    },
    goerli: {
      url: `${ALCHEMY_API_KEY || ""}`,
      accounts: [`${DEPLOYER_PRIVATE_KEY || EMPTY_PRIVATE_KEY}`]
    }
  }
};

export default config;