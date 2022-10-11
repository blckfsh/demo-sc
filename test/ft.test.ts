import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { expect } from "chai";
import { ethers } from "hardhat";
import { Contract, ContractFactory } from "ethers";

describe("Fungible Token", async () => {
    let Coin: ContractFactory;
    let coin: Contract;
    let owner: SignerWithAddress;
    let signer1: SignerWithAddress;
    
    // constant variable (pre-set)
    const NAME: string = "MyCoin";
    const SYMBOL: string = "MCN";
    const AMOUNT: string = ethers.utils.parseEther("1").toString(); // equals to 1000000000000000000 wei

    before(async () => {
        // Get signers
        [owner, signer1] = await ethers.getSigners(); 

        // Deploy the Coin Smart Contract
        Coin = await ethers.getContractFactory("MyCoin");
        coin = await Coin.deploy();
        await coin.deployed();
    })

    describe("Happy Path: Mint/Transfer/Burn Mechanism", async () => {
        it("Should be able to verify the name of smart contract", async () => {
            expect(await coin.name()).to.equal(NAME);
        })

        it("Should be able to verify the symbol of smart contract", async () => {
            expect(await coin.symbol()).to.equal(SYMBOL);
        })

        it("Should be able to verify correct owner", async () => {
            expect(await coin.owner()).to.equal(owner.address);
        })

        it("Should be able to verify total supply", async () => {
            expect(await coin.totalSupply()).to.equal(0);
        })
    })

    describe("Setters: Minting", async () => {
        it("Should be able to mint coins", async () => {
            await coin.connect(owner).mint(owner.address, AMOUNT);
        })

        it("Should be able to verify token balance of caller", async () => {
            expect(await coin.balanceOf(owner.address)).to.equal(AMOUNT);
        })

        it("Should be able to verify total supply", async () => {
            expect(await coin.totalSupply()).to.equal(AMOUNT);
        })
    })

    describe("Setters: Transfer Tokens", async () => {
        it("Should be able to transfer coins from owner to other address", async () => {
            await coin.connect(owner).transfer(signer1.address, AMOUNT);
        })

        it("Should be able to verify token balance of owner", async () => {
            expect(await coin.balanceOf(owner.address)).to.equal(0);
        })

        it("Should be able to verify token balance of signer", async () => {
            expect(await coin.balanceOf(signer1.address)).to.equal(AMOUNT);
        })
    })

    describe("Setters: Burn Tokens", async () => {
        it("Should be able to transfer coins from owner to other address", async () => {
            await coin.connect(signer1).burn(AMOUNT);
        })
        
        it("Should be able to verify token balance of caller", async () => {
            expect(await coin.balanceOf(signer1.address)).to.equal(0);
        })
    })
})