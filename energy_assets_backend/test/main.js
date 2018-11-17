var Main = artifacts.require("Main");

  // accounts[0]: MasterAccess
  // accounts[1]: Utility Company1
  // accounts[2]: Utility Company2
  // accounts[3]: Fossil Fuel Generator1
  // accounts[4]: Fossil Fuel Generator2
  // accounts[5]: User1
  // accounts[6]: User2
  // accounts[7]: Government Actor
  // accounts[8]: Adversarial Actor
  // accounts[9]: Public

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

  

});
