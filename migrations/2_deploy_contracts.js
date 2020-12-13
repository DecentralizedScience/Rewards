var Rewards = artifacts.require("./Rewards.sol");

module.exports = function(deployer) {
  deployer.deploy(Rewards);
};
