import { Contract, ContractFactory } from "ethers";
import { ethers } from "hardhat";

async function main() {
  let Nft: ContractFactory;
  let nft: Contract;

  Nft = await ethers.getContractFactory("MyToken");
  nft = await Nft.deploy();

  await nft.deployed();

  console.log(`NFT Contract was deployed to address ${nft.address}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
