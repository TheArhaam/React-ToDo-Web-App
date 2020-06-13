import React, { Component } from 'react';
import './App.css';
import Login from './Login';
import Register from './Register'

// TODO:
// CREATED JS FILES FOR EACH PAGE
// -LOGIN
// -REGISTER
// -MAINFEED

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1>TO-DO Web Application</h1>
        <Login />
        <Register />
      </div>
    );
  }
}

export default App;
