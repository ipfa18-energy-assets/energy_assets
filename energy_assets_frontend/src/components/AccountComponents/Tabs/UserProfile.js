import React, { Component } from 'react';

import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';



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
    name: "David Chi",
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
    const { classes, action } = this.props;
    let actionButton
    if (action == "redeem") {
      actionButton = (<Button variant="contained" className = {classes.button}>
                        Redeem
                      </Button>)
    } else {
      actionButton = (<Button variant="contained" className = {classes.button}>
                        Sell
                      </Button>)
    }

    return (
        <div className = {classes.userProf}>
          <div>
            <TextField
              label="Name"
              className={classes.textField}
              value={this.state.name}
              onChange={this.handleChange('name')}
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
              onChange={this.handleChange('utilityCompany')}
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
            {actionButton}
            <Button variant="contained" className = {classes.button}>
              Home
            </Button>
          </div>
        </div>
      </div>
    );
  }
}
export default withStyles(styles)(UserProfile);
