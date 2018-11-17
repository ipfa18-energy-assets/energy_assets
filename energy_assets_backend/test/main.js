var Main = artifacts.require("Main");

contract('Main', function(accounts) {
  it("should print out zero as the initial balance of owner", function() {
    return Main.deployed().then(function(instance) {
      return instance.getUserBalance.call(accounts[0]);
    }).then(function(balance) {
      assert.equal(balance.valueOf(), 0, "0 wasn't the initial balance");
    });
  });
});
