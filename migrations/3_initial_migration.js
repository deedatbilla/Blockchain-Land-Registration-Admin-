
var landRegistration = artifacts.require("./landRegistration.sol");

module.exports = function(deployer) {
  deployer.deploy(landRegistration);
};
