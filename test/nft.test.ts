import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { expect } from "chai";
import { ethers } from "hardhat";
import { Contract, ContractFactory } from "ethers";

describe("NFT", async () => {
    let Nft: ContractFactory;
    let nft: Contract;
    let owner: SignerWithAddress;
    let signer1: SignerWithAddress;
    
    // constant variable (pre-set)
    const NAME: string = "MyToken";
    const SYMBOL: string = "MTK";

    before(async () => {
        // Get signers
        [owner, signer1] = await ethers.getSigners(); 

        // Deploy the NFT Smart Contract
        Nft = await ethers.getContractFactory("MyToken");
        nft = await Nft.deploy();
        await nft.deployed();
    })

    describe("Getters", async () => {
        it("Should be able to verify the name of smart contract", async () => {
            expect(await nft.name()).to.equal(NAME);
        })

        it("Should be able to verify the symbol of smart contract", async () => {
            expect(await nft.symbol()).to.equal(SYMBOL);
        })

        it("Should be able to verify correct owner", async () => {
            expect(await nft.owner()).to.equal(owner.address);
        })

        it("Should be able to verify total supply", async () => {
            expect(await nft.totalSupply()).to.equal(0);
        })
    })

    describe("Setters: Minting", async () => {
        await nft.connect(owner).safeMint(owner.address);

        it("Should be able to verify token ownership", async () => {
            expect(await nft.ownerOf(0)).to.equal(owner.address);
        })

        it("Should be able to verify total supply", async () => {
            expect(await nft.totalSupply()).to.equal(1);
        })
    })

    // Setters: Expecting Reverts
    describe("Setters: Minting", async () => {
        it("Should not be able to mint if signer if not the owner", async () => {
            await expect(nft.connect(signer1).safeMint(signer1.address)).to.be.revertedWith("Ownable: caller is not the owner");
        })
    })
})