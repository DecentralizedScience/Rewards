import React, { Component } from "react";
import RewardsContract from "./contracts/Rewards.json";
import getWeb3 from "./getWeb3";
import NavBar from "./components/commons/NavBar/NavBar";
import Card from "./components/commons/Card/Card";
import Form from "./components/commons/Form/Form";
import { Loader } from "semantic-ui-react";

import "./App.css";

class App extends Component {
  //state = { storageValue: 0, web3: null, accounts: null, contract: null };

  componentDidMount = async () => {
    try {
      // Get network provider and web3 instance.
      const web3 = await getWeb3();

      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts();
      this.setState({ account: accounts[0] });
      // Get the contract instance.
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = RewardsContract.networks[networkId];
      const instance = new web3.eth.Contract(
        RewardsContract.abi,
        deployedNetwork.address
      );
      // Get the papers
      const paperCount = await instance.methods.paperCount().call();
      this.setState({ paperCount });
      for (var i = 0; i < paperCount; i++) {
        const paper = await instance.methods.papers(i).call();
        this.setState({ papers: [...this.state.papers, paper] });
      }
      this.setState({ ready: false });
      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      this.setState({ web3, contract: instance });
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`
      );
      console.error(error);
    }
  };

  updatePapers = async () => {
    const paperCount = await this.state.contract.methods.paperCount().call();
    this.setState({ paperCount });
    const paper = await this.state.contract.methods
      .papers(paperCount - 1)
      .call();
    this.setState({ papers: [...this.state.papers, paper] });
  };

  constructor(props) {
    super(props);
    this.state = {
      account: "",
      paperCount: 0,
      papers: [],
      contract: null,
      ready: true,
    };

    this.tipPaper = this.tipPaper.bind(this);
    this.createPaper = this.createPaper.bind(this);
  }

  tipPaper(id, amount) {
    this.setState({ ready: true });
    this.state.contract.methods
      .tipPaper(id)
      .send({ from: this.state.account, value: amount })
      .once("receipt", (receipt) => {
        this.setState({ ready: false });
      });
  }

  createPaper(title) {
    this.setState({ ready: true });
    this.state.contract.methods
      .createPaper(title, this.state.account)
      .send({ from: this.state.account })
      /*.on('error', function(error, receipt) {
      alert(
        `Operation cancelled.`,
      );
      this.setState({ ready: false })
    })*/
      .once("receipt", (receipt) => {
        this.updatePapers();
        this.setState({ ready: false });
      });
  }

  render() {
    if (!this.state.web3) {
      return <div>Loading Web3, accounts, and contract...</div>;
    }
    return (
      <div>
        <NavBar account={this.state.account}></NavBar>
        {this.state.ready ? (
          <div>
            <Loader active inline="centered" />
          </div>
        ) : (
          <div>
            <div className="cards">
              <Form createPaper={this.createPaper}></Form>
              <p></p>
            </div>

            <div className="cards">
              <Card tipPaper={this.tipPaper} papers={this.state.papers}></Card>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default App;
