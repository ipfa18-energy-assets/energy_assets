// exports and deploys greeter
// DO NOT EDIT THE CODE IN THIS FILE
var CertificateTracking = artifacts.require("./CertificateTracking.sol");

module.exports = function(deployer) {
    deployer.deploy(CertificateTracking);
};
