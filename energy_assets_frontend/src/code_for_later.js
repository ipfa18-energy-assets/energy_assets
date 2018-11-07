import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    const contract = window.web3.eth.contract([{"constant":false,"inputs":[{"name":"_greeting","type":"string"}],"name":"greeter","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"greet","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"}]);

    this.state = {
      ContractInstance: contract.at('0x2e946f62e45f1f56d6ac30d06868421c7639d125')
    }

    this.greet = this.greet.bind(this);


  }

  greet() {
    const { getGreet } = this.state.ContractInstance;

    getGreet ((err, greet) => {
      if (err) console.error ('An error occured::::', err);
      console.log (greet);
    })
  }



  render() {
    return (
      <div className="App">
        <button onClick={this.greet}> Get a greeting </button>
      </div>
    );
  }
}

export default App;
