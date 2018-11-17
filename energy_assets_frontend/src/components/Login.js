import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import { Link } from 'react-router-dom';
import web3 from './BlockchainWrappers/Web3';
import compose from 'recompose/compose';
import abi from './BlockchainWrappers/Abi'

const styles = {
  background: {
    width: "100%",
    height: "80%",
    position: "absolute",
    background: "-webkit-gradient(linear, left top, right bottom, color-stop(0%, rgba(30,214,128,1)), color-stop(100%, rgba(23,173,60,1)))", /* safari4+,chrome */
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
    userType: 'User',
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
  onSubmit =  async event => {
    const accounts = await web3.eth.getAccounts(function(error, result) {
        if(error != null)
            console.log("Couldn't get accounts");
       const account = result[0]
       web3.eth.defaultAccount = account
       let abi_contract = web3.eth.contract(abi)
       let addr_contract = abi_contract.at("0x8990ba16636510ed26c57f738dbe41caa91aedf9")
       console.log(addr_contract.sell(1))
    });
  }

  render() {
    const { classes } = this.props
    const { userType } = this.state


    let signInButton

    if (userType == 'User') {
      signInButton = (<Button className = {classes.signInButton} color="inherit" component={Link} to="/useraccount">
            Continue
            </Button>)
    } else if (userType == 'UC') {
      signInButton = (<Button className = {classes.signInButton} color="inherit" component={Link} to="/ucaccount">
            Continue
            </Button>)
    } else {
      signInButton = (<Button className = {classes.signInButton} color="inherit" component={Link} to="/ffgaccount">
            Continue
            </Button>)
    }
    return (
      <div className={classes.background}>
        <div className = {classes.mainCardWrapper}>
          <Card className = {classes.mainCard}>
            <Typography  className = {classes.topText} variant="headline">
              SIGN INTO YOUR ACCOUNT
            </Typography>
            <div className = {classes.accountTypes}>
            <FormControl component="fieldset" className={classes.formControl}>
              <RadioGroup
                className={classes.group}
                value={this.state.userType}
                onChange={this.handleChangeUserType}
                row
              >
                <FormControlLabel value="User" control={<Radio />} label="User" />
                <FormControlLabel value="UC" control={<Radio />} label="UC" />
                <FormControlLabel value="FFGs" control={<Radio />} label="FFGs" />
              </RadioGroup>
            </FormControl>
            </div>
            <div className = {classes.inputs}>
              <div>
                <TextField
                  value={this.state.username}
                  placeholder={"Username"}
                  onChange={this.handleChangeUsername('username')}
                  margin="normal"
                  variant="filled"
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
              {signInButton}
            </div>
            <Button className = {classes.signInButton} color="inherit" onClick={this.onSubmit}>
                  Continue
            </Button>
          </Card >
        </div>
      </div>
    );
  }
}
export default withStyles(styles)(Login);
