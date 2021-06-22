import React from "react";
import { DrizzleContext } from "@drizzle/react-plugin";
import { Drizzle } from "@drizzle/store";
import { Layout, Menu } from 'antd';
import drizzleOptions from "./drizzleOptions";
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import "./App.css";
import "antd/dist/antd.css";
import HomePage from './pages/HomePage'
import Paper from './pages/PaperPage'
import Reviewers from './pages/ReviewersPage'
import Jazzicon, { jsNumberForAddress } from 'react-jazzicon'

const { Header, Content, Footer } = Layout;

const drizzle = new Drizzle(drizzleOptions);

const App = () => {
  return (
    <DrizzleContext.Provider drizzle={drizzle}>
      <DrizzleContext.Consumer>
        {drizzleContext => {
          const { drizzle, drizzleState, initialized } = drizzleContext;

          if (!initialized) {
            return "Loading..."
          }

          return (
            <Router>
              <Layout className="layout">
                <Header>
                  <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
                    <Menu.Item key="1"><Link to="/">Papers</Link></Menu.Item>
                    <Menu.Item key="2"><Link to="/reviewers">Reviewers</Link></Menu.Item>
                    <div className="account">
                      Current Account: {drizzleState.accounts[0] || ""} &nbsp;&nbsp;&nbsp;&nbsp; {drizzleState.accounts[0] && <Jazzicon diameter={40} seed={jsNumberForAddress(drizzleState.accounts[0])} />}
                    </div>
                  </Menu>
                </Header>
                <Content className="content">
                  <div className="site-layout-content">
                    <Switch>
                      <Route path="/paper/:id" >
                        <Paper drizzle={drizzle} drizzleState={drizzleState} ></Paper>
                      </Route>
                      <Route path="/reviewers" >
                        <Reviewers drizzle={drizzle} drizzleState={drizzleState} ></Reviewers>
                      </Route>
                      <Route path="/" >
                        <HomePage drizzle={drizzle} drizzleState={drizzleState} />
                      </Route>
                    </Switch>
                  </div>
                </Content>
                <Footer>2021 Blockchain Rewards: Money, Badges and Reputation for peer reviewers</Footer>
              </Layout>
            </Router>
          )
        }}
      </DrizzleContext.Consumer>
    </DrizzleContext.Provider>
  );
}

export default App;
