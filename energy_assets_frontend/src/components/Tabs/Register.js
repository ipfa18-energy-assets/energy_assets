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
    ucAddress: ""
  };

    handleChange = name => event => {
     this.setState({
       [name]: event.target.value,
     });
   };
   RegisterAccount = event => {
     contract.registration(this.state.address, Number(this.state.accountType))
   }
   ConnectAccount = event => {
     contract.userRegistration(this.state.userAddress, "0xe6828b402729f6c8ac3c38be82c389af14379d7b", {from: this.state.ucAddress, gas:3000000}) //Random address for oracle because idk, magic number on gas because idk
   }
   standardRegistration = event => {
     web3.eth.getAccounts(function(err, result) {
       contract.registration(result[1], 2)
       contract.registration(result[2], 2)
       contract.registration(result[3], 3)
       contract.registration(result[4], 3)
       contract.userRegistration(result[5], result[8], {from: result[1], gas:3000000}) //magic number on gas because idk
       contract.userRegistration(result[6], result[9], {from: result[2], gas:3000000}) //magic number on gas because idk
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
              label="UC Address"
              className={classes.textField}
              value={this.state.ucAddress}
              onChange={this.handleChange('ucAddress')}
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
