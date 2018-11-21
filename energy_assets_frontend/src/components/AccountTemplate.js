import React, { Component } from 'react';

import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import UserProfile from './Tabs/UserProfile'
import History from './Tabs/History'
import RegisterVE from './Tabs/RegisterVE'
import RegisteredUsers from './Tabs/RegisteredUsers'


const styles = {
  menu: {
    float: "left",
    background: "-webkit-gradient(linear, left top, left bottom, color-stop(0%, rgba(18,53,255,1)), color-stop(100%, rgba(20,255,255,1)))", /* safari4+,chrome */
    width: "10%",
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


class AccountTemplate extends Component {
  state = {
    currentShownComponent: "UserProfile",
    accountType: this.props.location.state.accountType,
    address: this.props.location.state.address

  };

    handleChange = name => event => {
     this.setState({
       currentShownComponent: name,
     });
   };


  render() {
    const { classes } = this.props;
    const { currentShownComponent, accountType, address } = this.state;
    var currentState
    let accountSideBar
    if (accountType === 'User') {
      accountSideBar = (<div className = {classes.menu}>
                          <Button  fullWidth className = {classes.sideButton} onClick = {this.handleChange("UserProfile")}>
                            Profile
                          </Button>
                          <Button  fullWidth className = {classes.sideButton} onClick={this.handleChange("History")}>
                            History
                          </Button>
                          <Button  fullWidth className = {classes.sideButton} onClick={this.handleChange("RegisterVE")}>
                            Registered VE
                          </Button>
                        </div>)
    } else if (accountType === 'UC') {
      accountSideBar = (<div className = {classes.menu}>
                          <Button  fullWidth className = {classes.sideButton} onClick = {this.handleChange("UserProfile")}>
                            Profile
                          </Button>
                          <Button  fullWidth className = {classes.sideButton} onClick={this.handleChange("RegisteredUsers")}>
                            Registered Users
                          </Button>
                        </div>)

    } else {
      accountSideBar = (<div className = {classes.menu}>
                          <Button  fullWidth className = {classes.sideButton} onClick = {this.handleChange("UserProfile")}>
                            Profile
                          </Button>
                          <Button  fullWidth className = {classes.sideButton} onClick={this.handleChange("History")}>
                            History
                          </Button>
                          <Button  fullWidth className = {classes.sideButton} onClick={this.handleChange("RegisterVE")}>
                            Registered VE
                          </Button>
                        </div>)
    }

    if (currentShownComponent === "RegisterVE") {
      currentState = (<RegisterVE/>)
    } else if (currentShownComponent === "History") {
      currentState = (<History/>)
    } else if (currentShownComponent === "UserProfile"){
      if (accountType === "User") {
        currentState = (<UserProfile action={'redeem'} address={address} accountType={accountType}/>)
      } else if (accountType === "UC") {
        currentState = (<UserProfile action={'sell'} address={address} accountType={accountType}/>)
      } else {
        currentState = (<UserProfile action={'buy'} address={address} accountType={accountType}/>)
      }
    } else if (currentShownComponent === "RegisteredUsers") {
      currentState = (<RegisteredUsers/>)
    }


    return (
      <div className = {classes.background}>
        {accountSideBar}
        <div>
          UserProfile
        </div>
        {currentState}
      </div>
    );
  }
}
export default withStyles(styles)(AccountTemplate);
