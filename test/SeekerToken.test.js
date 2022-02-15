const SeekerToken = artifacts.require("SeekerToken");

// var chai = require("chai");
// const BN = web3.utils.BN;
// const chaiBN = require("chai-bn")(BN);
// chai.use(chaiBN);

// var chaiAsPromised = require("chai-as-promised");
// chai.use(chaiAsPromised);

// const expect = chai.expect;

contract("SeekerToken", async (accounts) => {
  before(async function () {
    instance = await SeekerToken.deployed();
  });

  it("balance should initially be zero", async () => {
    const balance = await instance.balanceOf(accounts[0]);
    assert.equal(balance, 0, " the initial balance should be zero");
  });

  it("max total supply should be 10,000", async () => {
    const totSupply = await instance.totalSupply();
    assert.equal(totSupply, 10000, "max total supply should be 10,000");
  });

  it("Post mint balance should be one", async () => {
    await instance.mint("hello", {
      value: web3.utils.toWei("0.01", "ether"),
      from: accounts[0],
    });
    const balance = await instance.balanceOf(accounts[0]);

    assert.equal(balance, 1, "Post mint balance should be one");
  });

  it("post gift balance is one", async () => {
    await instance.mint("hello", {
      value: web3.utils.toWei("0.01", "ether"),
      from: accounts[0],
    });
    await instance.gift(accounts[1], "hello", {
      from: accounts[0],
    });
    const balance = await instance.balanceOf(accounts[1]);

    assert.equal(balance, 1, "Post mint balance should be one");
  });
});
