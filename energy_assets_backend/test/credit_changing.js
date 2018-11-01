var Main = artifacts.require("./Main.sol");

contract('Main', function(accounts) {
  let instance
  let owner = accounts[0]
  let account = accounts[1]

  it("should allow a trusted party to change certain wei rates", function() {
    return Main.deployed()
      .then(function(instance) {
        instance.Main();
        instance.changeCreditRate.call(10);
        assert.equal(instance.creditPerUnitOfCharge(), 10, "Credit Per Unit Of Charge")
      })
  });
});
