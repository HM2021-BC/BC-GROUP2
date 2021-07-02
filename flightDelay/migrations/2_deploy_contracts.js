var ClientCreator = artifacts.require("./InsuranceClients.sol");

module.exports = function(deployer) {
  deployer.deploy(ClientCreator);
};
