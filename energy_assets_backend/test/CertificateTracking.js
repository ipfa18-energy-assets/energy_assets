var CertificateTracking = artifacts.require("./CertificateTracking.sol");

contract('CertificateTracking', function(accounts) {
  const args = {_greeting: "test greeting"};
  it("should add a certificate", function() {
    return CertificateTracking.deployed()
      .then(function(instance) {
        /* CALL the greet function */
        instance.CertificateTracking();
        return instance.addCertificates.call(10);
      })
      .then(function(result) {
        assert.equal(result, 10, "Value added to certificate list should match inputed values.")
      })
  });
  it("should remove a certificate", function() {
    return CertificateTracking.deployed()
      .then(function(instance) {
        /* CALL the greet function */
        instance.CertificateTracking();
        instance.addCertificates.call(10);
        return instance.buyCertificates.call(10);
      })
      .then(function(result) {
        assert.equal(result, 10, "Value bought should match inputed values.")
        assert.equal(instance.buyCertificates.call(10), 0, "Should be no more certificates left.")
      })
  });
});
