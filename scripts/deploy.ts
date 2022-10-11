import { Contract, ContractFactory } from "ethers";
import { ethers } from "hardhat";

async function main() {
  let Coin: ContractFactory;
  let coin: Contract;

  Coin = await ethers.getContractFactory("MyCoin");
  coin = await Coin.deploy();

  await coin.deployed();

  console.log(`Coin Contract was deployed to address ${coin.address}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

// 0x54B77a684eBD3C0564B60076c738E52416015090
