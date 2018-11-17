// exports and deploys greeter
// DO NOT EDIT THE CODE IN THIS FILE
var Main = artifacts.require("./Main.sol");

module.exports = function(deployer) {
    deployer.deploy(Main);
};
