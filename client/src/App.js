import React, { Component } from "react";
import RewardsContract from "./contracts/Rewards.json";
import getWeb3 from "./getWeb3";
import NavBar from './components/commons/NavBar/NavBar'
import Card from './components/commons/Card/Card'

import "./App.css";

class App extends Component {
  state = { storageValue: 0, web3: null, accounts: null, contract: null };

  componentDidMount = async () => {
    try {
      // Get network provider and web3 instance.
      const web3 = await getWeb3();

      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts();
      this.setState({ account: accounts[0] })
      // Get the contract instance.
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = RewardsContract.networks[networkId];
      const instance = new web3.eth.Contract(RewardsContract.abi, deployedNetwork.address);
      // Get the first paper
      const paper = await instance.methods.papers(0).call()
      this.setState({paper: paper})
      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      this.setState({ web3, contract: instance });

    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }
  };

  constructor(props){
    super(props)
    this.state = {
      account: '',
      paperCount: 0,
      paper: '',
      contract: null
    }

    this.tipPaper = this.tipPaper.bind(this);
  }

  tipPaper(id, amount){
    this.state.contract.methods.tipPaper(id).send({ from: this.state.account, value: amount})
  }

  render() {
    if (!this.state.web3) {
      return <div>Loading Web3, accounts, and contract...</div>;
    }
    return (
      <div>
        <NavBar account={this.state.account}></NavBar>

        <div className="cards">
          <Card 
            tipPaper={this.tipPaper}
            paper={this.state.paper}
          ></Card>
        </div>
      </div>
    );
  }
}

export default App;
