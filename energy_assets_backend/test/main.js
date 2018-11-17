var Main = artifacts.require("Main");

  // accounts[0]: MasterAccess
  // accounts[1]: Utility Company1
  // accounts[2]: Utility Company2
  // accounts[3]: Fossil Fuel Generator1
  // accounts[4]: Fossil Fuel Generator2
  // accounts[5]: User1
  // accounts[6]: User2
  // accounts[7]: Government Actor
  // accounts[8]: Oracle1
  // accounts[9]: Oracle2

contract('Main', async (accounts) => {
  it("change access to an account", async () => {
    let instance = await Main.deployed();
    instance.changeAccess(accounts[1], false, true, false, false, false, false, false);
    let result = await instance.isAuthorizedToVerify(accounts[1]);
    assert.equal(result, true, "should not fail")
  });

  // it("attempt to register", async () => {
  //   let instance = await Main.deployed();
  //   let sender_addr = await instance.
  // });

  it("testing registering utility company", async () => {
    let instance = await Main.deployed();
    await instance.registration(accounts[1], 2);
    //assert.equal(result, true, "not registered");
    let type = await instance.getAddressTypeOf.call(accounts[1]);
    assert.equal(type.toNumber(), 2, "utility company is not registered");
  });

  it("comprehensive test", async () => {
    let instance = await Main.deployed();
    await instance.registration(accounts[1], 2);
    await instance.registration(accounts[2], 2);
    await instance.registration(accounts[3], 3);
    await instance.registration(accounts[4], 3);
    await instance.userRegistration(accounts[5], accounts[8], {from: accounts[1]});
    await instance.userRegistration(accounts[6], accounts[9], {from: accounts[2]});
    await instance.changeAccess(accounts[7], false, true, true, true, false, false, false);

    await instance.chargeCompleted(2, {from: accounts[8]});
    let userBalance = await instance.getUserBalance.call(accounts[5]);
    let utilBalance = await instance.getCreditBalance.call({from: accounts[1]});
    assert.equal(userBalance.toNumber(), 1800, "user balance is incorrect");
    assert.equal(utilBalance.toNumber(), 2, "util balance is incorrect");

    await instance.etherDeposit({from: accounts[3], value: 2000});
    await instance.sell(1, {from: accounts[1]});
    await instance.buy(1, {from: accounts[3]});
    utilBalance = await instance.getCreditBalance.call({from: accounts[1]});
    let utilBalanceInWei = await instance.getEtherBalance.call({from: accounts[1]});
    let ffBalance = await instance.getCreditBalance.call({from: accounts[3]});
    let ffBalanceInWei = await instance.getEtherBalance.call({from: accounts[3]});
    assert.equal(utilBalanceInWei.toNumber(), 1000, "util wei is incorrect");
    assert.equal(ffBalanceInWei.toNumber(), 1000, "ff wei is incorrect");
    assert.equal(utilBalance.toNumber(), 1, "util balance is incorrect");
    assert.equal(ffBalance.toNumber(), 1, "ff balance is incorrect");


  });
});
