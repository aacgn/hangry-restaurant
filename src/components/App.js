import React, { Component } from 'react';
import axios from 'axios';
import { HashRouter, Switch, Route, FadeIn } from 'react-router-dom';
import HomeActivity from './activities/Home';
import '../styles/index.scss';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isSideMenuVisible: false,
      data: {
        orders: [],
        restaurant: {}
      }
    }

    this.setStore = this.setStore.bind(this);
  }

  setStore(newState) {
    this.setState(newState);
  }

  render() {
    return (
      <>
        <meta name="theme-color" content="#fe5722"></meta>
        <HashRouter>
          <Switch>
          <Route path="/" render={
              props => <HomeActivity store={this.state} store={this.state} setStore={s => this.setStore(s)} {...props} />} 
            />
            <Route path="/:id" render={
              props => <HomeActivity store={this.state} store={this.state} setStore={s => this.setStore(s)} {...props} />} 
            />
          </Switch>
        </HashRouter>
      </>
    );
  }
}

export default App;