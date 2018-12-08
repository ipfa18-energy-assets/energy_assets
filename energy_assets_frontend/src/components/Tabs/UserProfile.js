import React, { Component } from 'react';

import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { Link } from 'react-router-dom';
import web3 from '../BlockchainWrappers/Web3';
import contract from '../BlockchainWrappers/Abi';




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


class UserProfile extends Component {
  state = {
    address: this.props.address,
    creditBalance: -1,
    etherBalance: 0,
    utilityCompany: "FF"
  };

    handleChange = name => event => {
     this.setState({
       [name]: event.target.value,
     });
   };


  render() {
    const self = this
    console.log(this.state.address)
    if (Number(this.state.creditBalance) === -1) {
      contract.getCreditBalance({from: web3.eth.coinbase}, function(error, data) {
        self.setState({creditBalance: Number(data)})
      })
    }

    // web3.eth.getBalance({from: web3.eth.defaultAccount}, function(error, data) {
    //   self.setState({etherBalance: Number(data)})
    // })
    const { classes, action, accountType } = this.props;
    const { address } = this.state

    return (
        <div className = {classes.userProf}>
          <div>
            <TextField
              label="Address"
              className={classes.textField}
              value={address}
              margin="normal"
              variant="outlined"
            />
          </div>
          <div>
            <TextField
              label="Credit Balance"
              className={classes.textField}
              value={this.state.creditBalance}
              onChange={this.handleChange('creditBalance')}
              margin="normal"
              variant="outlined"
            />
          </div>
          <div>
            <TextField
              label="Utility Company"
              className={classes.textField}
              value={this.state.utilityCompany}
              margin="normal"
              variant="outlined"
            />
          </div>
          <div>
            <TextField
              label="Ether Balance"
              className={classes.textField}
              value={this.state.etherBalance}
              onChange={this.handleChange('etherBalance')}
              margin="normal"
              variant="outlined"
            />
          </div>
        <div>
          <div>
            <Button color="inherit" className = {classes.button} component={Link} to={{ pathname: "/EthereumTradingCard", state: { transaction: {action}, address: address, accountType: accountType}}}>
              {action}
            </Button>
            <Button className = {classes.button} color="inherit" component={Link} to="/">
              Home
            </Button>
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(UserProfile);
