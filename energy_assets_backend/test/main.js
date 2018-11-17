var Main = artifacts.require("Main");

contract('Main', function(accounts) {

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

  it("should print out zero as the initial balance of owner", function() {
    return Main.deployed().then(function(instance) {
      return instance.getUserBalance.call(accounts[0]);
    }).then(function(balance) {
      assert.equal(balance.valueOf(), 0, "0 wasn't the initial balance");
    });
  });

});
