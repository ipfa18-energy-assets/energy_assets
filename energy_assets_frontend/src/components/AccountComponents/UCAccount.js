import React, { Component } from 'react';

import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import UserProfile from './Tabs/UserProfile'
import History from './Tabs/History'
import RegisterVE from './Tabs/RegisterVE'



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


class UCAccount extends Component {
  state = {
    name: "David Chi",
    creditBalance: "1234",
    etherBalance: "12",
    utilityCompany: "FF",
    currentShownComponent: "UserProfile"
  };

    handleChange = name => event => {
     this.setState({
       currentShownComponent: name,
     });
   };


  render() {
    const { classes } = this.props;
    const { currentShownComponent } = this.state;
    // if (this.props.buttons) {
    //   const buttons = this.props.buttons.map((buttonName) =>
    //     <Button  fullWidth className = {classes.sideButton} onClick = {this.handleChange({buttonName})}>
    //       {buttonName}
    //     </Button>
    //   )
    // }
    var currentState;
    if (currentShownComponent === "RegisterVE") {
      currentState = (<RegisterVE/>)
    } else if (currentShownComponent === "History") {
      currentState = (<History/>)
    } else {
      currentState = (<UserProfile/>)
    }


    return (
      <div className = {classes.background}>
        <div className = {classes.menu}>
          <Button  fullWidth className = {classes.sideButton} onClick = {this.handleChange("UserProfile")}>
            Profile
          </Button>
          <Button  fullWidth className = {classes.sideButton} onClick={this.handleChange("History")}>
            History
          </Button>
          <Button  fullWidth className = {classes.sideButton} onClick={this.handleChange("RegisterVE")}>
            Registered VE
          </Button>
        </div>
        <div>
          UserProfile
        </div>
        {currentState}
      </div>
    );
  }
}
export default withStyles(styles)(UCAccount);
