import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import web3 from './BlockchainWrappers/Web3';
import contract from './BlockchainWrappers/Abi'
import { Redirect } from 'react-router-dom'


const styles = {
  background: {
    width: "100%",
    height: "80%",
    position: "absolute",
    background: "linear-gradient(-180deg, #2D61D1 0%, #0FA8A4 81%)", /* safari4+,chrome */
    filter: "progid:DXImageTransform.Microsoft.gradient( startColorstr='#1ED680', endColorstr='#17AD3C',GradientType=1 )" /* ie6-9 */
  },
  topText: {
    textAlign: "center"
  },
  accountType: {
    paddingRight: "50px",

  },
  accountTypes: {
    paddingLeft: "40%",
  },
  mainCardWrapper: {
    padding: "10%"
  },
  mainCard: {
    padding: "3%"
  },
  signInButton: {
    background: "-webkit-linear-gradient(335deg, rgba(30,214,128,1) 0%, rgba(23,173,60,1) 100%)", /* safari5.1+,chrome10+ */
    color: "white",
  },
  signInButtonWrapper: {
    paddingLeft: "45%",
    padding: "1%"
  },
  inputs: {
    paddingLeft: "35%",
  },
}

class Login extends Component {
  state = {
    username: "",
    password: "",
    userType: '',
    error: false
  }
  handleChangeUsername = prop => event => {
   this.setState({ [prop]: event.target.value });
  };
  handleChangePassword = prop => event => {
   this.setState({ [prop]: event.target.value });
  };
  handleChangeUserType = event => {
    this.setState({ userType: event.target.value });
  };
  onSubmit = event => {
    this.setState({error: false})
    const user = this.state.username !== "" ? this.state.username : web3.eth.coinbase
    const self = this
    const userType = Number(contract.getAddressType({from:user}, function(error, data) {
      const userType = Number(data);
      if (userType <= 1) {
        self.setState({userType: "User"})
      } else if (userType === 2) {
        self.setState({userType: "UC"})
      } else if (userType === 3){
        self.setState({userType: "FFG"})
      } else {
        self.setState({error: true})
      }
    }))

  }

  render() {
    const { classes } = this.props
    const { userType, error } = this.state

    if (userType !== '') {
      return <Redirect to={{ pathname: "/account", state: { address: this.state.username !== "" ? this.state.username : web3.eth.coinbase, accountType: userType} }} />
    }
    return (
      <div className={classes.background}>
        <div className = {classes.mainCardWrapper}>
          <Card className = {classes.mainCard}>
            <Typography  className = {classes.topText} variant="headline">
              SIGN INTO YOUR ACCOUNT
            </Typography>
            <div className = {classes.accountTypes}>
            </div>
            <div className = {classes.inputs}>
              <div>
                <TextField
                  value={this.state.username}
                  placeholder={"Username"}
                  onChange={this.handleChangeUsername('username')}
                  margin="normal"
                  variant="filled"
                  error = {error}
                />
              </div>
              <div>
               <TextField
                 value={this.state.password}
                 placeholder={"Password"}
                 onChange={this.handleChangePassword('password')}
                 margin="normal"
                 variant="outlined"
               />
             </div>
           </div>
            <div className = {classes.signInButtonWrapper}>
              <Button className = {classes.signInButton} color="inherit" onClick={this.onSubmit}>
                    Continue
                    </Button>
              </div>
          </Card >
        </div>
      </div>
    );
  }
}
export default withStyles(styles)(Login);
