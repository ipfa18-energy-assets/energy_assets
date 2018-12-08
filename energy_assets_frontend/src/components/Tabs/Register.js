import React, { Component } from 'react';

import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import contract from '../BlockchainWrappers/Abi';
import web3 from '../BlockchainWrappers/Web3';




const styles = {
  menu: {
    float: "left",
    background: "-webkit-gradient(linear, left top, left bottom, color-stop(0%, rgba(18,53,255,1)), color-stop(100%, rgba(20,255,255,1)))", /* safari4+,chrome */
    width: "20%",
    height: "100%",
  },
  background: {
    width: "100%",
    height: "80%",
    position: "absolute",
  },
  sideButton: {
    color: "white"
  },
  button: {
    background: "aqua"
  }


}


class Register extends Component {
  state = {
    address: "",
    accounType: 0,
    userAddress: "",
    oracleAddress: ""
  };

    handleChange = name => event => {
     this.setState({
       [name]: event.target.value,
     });
   };
   masterAccount = event => {
     web3.eth.defaultAccount = web3.eth.coinbase
   }
   RegisterAccount = event => {
     contract.registration(this.state.address, Number(this.state.accountType), {from: web3.eth.coinbase}, function(error, data) {
       console.log(error, data)
     })
   }
   ConnectAccount = event => {
     contract.userRegistration(this.state.userAddress, this.state.oracleAddress, {from: web3.eth.coinbase}, function(error, data) {
       console.log(error, data)
     }) //Random address for oracle because idk, magic number on gas because idk
   }
   standardRegistration = event => {
     contract.registration("0x5A8d925Ca271F93Ea1A568eA5a7fF5e489EE6Ea8", 2, {from: web3.eth.coinbase}, function(error, data){
       console.log(data)
     })
     contract.registration("0x1EEDa4BB620ac1d65E29319A711B65995848fFE3", 3, {from: web3.eth.coinbase}, function(error, data){
       console.log(data)
     })
     contract.userRegistration("0x377840Bc18fCD3b787F7CFf7E5e0Dc1efF3cC8dE", "0x34bc4FA7F87D7f0f66A0D8cD13a454ABF07E61eE", {from: web3.eth.coinbase}, function(error, data){
       console.log(data)
     })
   }


  render() {
    const { classes } = this.props;
    return (
      <div>
        <div className = {classes.userProf}>
          Register UC or FFG
          <div>
            <TextField
              label="Address"
              className={classes.textField}
              value={this.state.address}
              onChange={this.handleChange('address')}
              margin="normal"
              variant="outlined"
            />
          </div>
          <div>
            <TextField
              label="Type of Account"
              className={classes.textField}
              value={this.state.accountType}
              onChange={this.handleChange('accountType')}
              margin="normal"
              variant="outlined"
            />
          </div>
          <div>
            <div>
              <Button variant="contained" className = {classes.continueButton} onClick = {this.RegisterAccount}>
                Register
              </Button>
            </div>
          </div>
        </div>
        <div className = {classes.userProf}>
          Connect User to UC
          <div>
            <TextField
              label="User Address"
              className={classes.textField}
              value={this.state.userAddress}
              onChange={this.handleChange('userAddress')}
              margin="normal"
              variant="outlined"
            />
          </div>
          <div>
            <TextField
              label="Oracle Address"
              className={classes.textField}
              value={this.state.oracleAddress}
              onChange={this.handleChange('oracleAddress')}
              margin="normal"
              variant="outlined"
            />
          </div>
          <div>
            <div>
              <Button variant="contained" className = {classes.continueButton} onClick = {this.ConnectAccount}>
                Connect
              </Button>
            </div>
          </div>
          <div>
            <div>
              <Button variant="contained" className = {classes.continueButton} onClick = {this.standardRegistration}>
                Standard Setup
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(Register);
