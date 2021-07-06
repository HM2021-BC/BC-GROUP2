var ClientCreator = artifacts.require("./InsuranceClients");

module.exports = function(deployer) {
  deployer.deploy(ClientCreator);
};
