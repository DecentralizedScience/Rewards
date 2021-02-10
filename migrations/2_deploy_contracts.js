var Rewards = artifacts.require("./Rewards.sol");
var ReputationToken = artifacts.require("./ReputationToken.sol");

module.exports = function(deployer) {
  deployer.deploy(Rewards);
  deployer.deploy(ReputationToken);
};
