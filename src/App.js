import React, { Component } from 'react';
// import './App.css';
import {Dashboard} from './Dashboard';

class App extends Component {
  render() {
    console.log(this.props.val)
    return (
      <div className="App">
        <header className="App-header">
          <Dashboard />
        </header>
      </div>
    );
  }
}

export default App;
