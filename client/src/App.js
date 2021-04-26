  import React, { Component } from "react";
  import RewardsContract from "./contracts/Rewards.json";
  import getWeb3 from "./getWeb3";
  import NavBar from "./components/commons/NavBar/NavBar";
  import Card from "./components/commons/Card/Card";
  import CardPaper from "./components/commons/Card/CardPaper";
  import FormPaper from "./components/commons/Form/FormPaper";
  import FormReview from "./components/commons/Form/FormReview";
  import AboutUs from "./components/commons/pages/AboutUs";
  import { Loader } from "semantic-ui-react";
  import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';

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
        const paperCount = await instance.methods.getPaperCount().call();
        this.setState({ paperCount });
        for (var i = 0; i < paperCount; i++) {
          const paper = await instance.methods.papers(i).call();
          //Get the reviews of the paper
          const reviewerCount = await instance.methods.getPaperReviewerCount(i).call();
          if(reviewerCount > 0){
            const reviewers = await instance.methods.getPaperReviewers(i).call();
            //const reviews = await instance.methods.getReviews(i, reviewers[0]).call();
            this.setState({ reviews: [...this.state.reviews, reviewers] });
          }
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
      const paperCount = await this.state.contract.methods.getPaperCount().call();
      this.setState({ paperCount });
      const paper = await this.state.contract.methods
        .papers(paperCount - 1)
        .call();
      this.setState({ papers: [...this.state.papers, paper] });
    };

    updateReviews = async (i) => {
      const reviewerCount = await this.state.contract.methods.getPaperReviewerCount(i).call();
      const reviewers = await this.state.contract.methods.getPaperReviewers(i).call();
      //const reviews = await this.state.contract.methods.getReviews(i, reviewers[0]).call();
      this.setState({ reviews: [...this.state.reviews.slice(0,i), reviewers, ...this.state.reviews.slice(i+1, reviewerCount) ]});
    
    }

    constructor(props) {
      super(props);
      this.state = {
        account: "",
        paperCount: 0,
        papers: [],
        contract: null,
        ready: true,
        reviews: [],
      };

      this.tipPaper = this.tipPaper.bind(this);
      this.getThanks = this.getThanks.bind(this);
      this.sayThanks = this.sayThanks.bind(this);
      this.giveReward = this.giveReward.bind(this);
      this.createPaper = this.createPaper.bind(this);
      this.createReview = this.createReview.bind(this);
    }

    tipPaper(id, amount, account) {
      this.setState({ ready: true });
      this.state.contract.methods
        .tipReviewer(id, account)
        .send({ from: this.state.account, value: amount })
        .once("receipt", (receipt) => {
          this.setState({ ready: false });
        });
    }

    getThanks(account){
      this.state.contract.methods
        .getReputation(account).call().then (x => {console.log(x)});
    }

    sayThanks(id, account){
      this.setState({ ready: true });
      this.state.contract.methods
        .giveReputation(id, account)
        .send({from: this.state.account})
        .once("receipt", (receipt) => {
        this.setState({ ready: false });
      })
    }

    
    giveReward(id, account, award_id){
      this.setState({ ready: true });
      this.state.contract.methods
        .giveAward(id, account, award_id)
        .send({from: this.state.account})
        .once("receipt", (receipt) => {
        this.setState({ ready: false });
      })
    }

    createPaper(title) {
      this.setState({ ready: true });
      this.state.contract.methods
        .createPaper(title)
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

    createReview(paper, author) {
      this.setState({ ready: true });
      this.state.contract.methods
        .addReviewer(paper,this.state.account,author)
        .send({ from: this.state.account })
        .once("receipt", (receipt) => {
          this.updateReviews(paper);
          this.setState({ ready: false });
        });
    }

    render() {
      if (!this.state.web3) {
        return <div>Loading Web3, accounts, and contract...</div>;
      }
      return (
        <Router>
          <div>
            <NavBar account={this.state.account}></NavBar>
            <Switch>
              <Route exact={true} path="/" render={() => (
                this.state.ready ? (
                  <div>
                    <Loader active inline="centered" />
                  </div>
                ) : (
                  <div>
                    <div className="cards">
                      <FormPaper createPaper={this.createPaper}></FormPaper>
                      <p></p>
                    </div>
                    <div className="cards">
                      <CardPaper papers={this.state.papers}></CardPaper>
                    </div>
                  </div>
                )
              )} />
              <Route exact={true} path="/paper/:id" render={(props) => (
                this.state.ready ? (
                  <div>
                    <Loader active inline="centered" />
                  </div>
                ) : (
                  <div>
                    <div className="cards">
                      <FormReview {...props} createReview={this.createReview}></FormReview>
                      <p></p>
                    </div>
                    <div className="cards">
                      <Card {...props} tipPaper={this.tipPaper} sayThanks={this.sayThanks} getThanks={this.getThanks} giveReward={this.giveReward} papers={this.state.papers} web3={this.state.web3} reviews={this.state.reviews} ></Card>
                    </div>
                  </div>
                )
              )} />
              <Route path="/aboutUs" exact component={AboutUs} />
            </Switch>
          </div>
        </Router>
      );
    }
  }


  export default App;
