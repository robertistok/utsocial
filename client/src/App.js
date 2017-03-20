import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import '../semantic/dist/semantic.min.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
        </div>
        <h2>Welcome to UTSocial</h2>
        <p className="App-intro">
          To get started, get your ass down and get shit done...
        </p>
        <button className="ui primary button">Click here</button>
      </div>
    );
  }
}

export default App;
