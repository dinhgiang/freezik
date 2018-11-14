import React from 'react';
import Router from './Router';
import { Component } from 'react';
import classes from './App.module.css';
import Header from './components/Header/Header';

class App extends Component {
  render() {
    return (
      <div className={classes.container}>
        <div className={classes.App}>
          <Header></Header>
          <Router></Router>
        </div>
      </div>
    )
  }
}

export default App;