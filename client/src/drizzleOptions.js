import Web3 from "web3";

import RewardsContract from "./contracts/Rewards.json";
import ReputationContract from "./contracts/ReputationToken.json";
import AwardsContract from "./contracts/AwardsToken.json";

const networkId = 5777;

const rewardsDeployed = RewardsContract.networks[networkId];
const reputationDeployed = ReputationContract.networks[networkId];
const awardsDeployed = AwardsContract.networks[networkId];

const provider = new Web3(Web3.givenProvider || "ws://localhost:7545");

const options = {
  web3: {
    block: false,
    // customProvider: provider,
  },
  contracts: [AwardsContract, ReputationContract,
    {
      contractName: "RewardsContract",
      web3Contract: new provider.eth.Contract(RewardsContract.abi, rewardsDeployed.address, reputationDeployed.address, awardsDeployed.address)
    }],
  // events: {
  //   SimpleStorage: ["StorageSet"],
  // },
};

export default options;
