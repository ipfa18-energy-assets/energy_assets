import React, { Component } from 'react';

import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import EthereumTradingCard from '../EthereumTradingCard';
import { Link } from 'react-router-dom';



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
    Address: "191910239231sda",
    creditBalance: "1234",
    etherBalance: "12",
    utilityCompany: "FF"
  };

    handleChange = name => event => {
     this.setState({
       [name]: event.target.value,
     });
   };


  render() {
    const { classes } = this.props;

    return (
        <div className = {classes.userProf}>
          <div>
            <TextField
              label="Address"
              className={classes.textField}
              value={this.state.Address}
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
            <Button className = {classes.button} color="inherit" component={Link} to="/EthereumTradingCard">
              Redeem
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
