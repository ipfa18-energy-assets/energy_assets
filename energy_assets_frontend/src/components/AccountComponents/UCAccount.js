import React, { Component } from 'react';

import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import UserProfile from './Tabs/UserProfile'
import RegisteredUsers from './Tabs/RegisteredUsers'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import InboxIcon from '@material-ui/icons/Inbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import AssignemntIcon from '@material-ui/icons/Assignment';
import HistoryIcon from '@material-ui/icons/History';
import CarIcon from '@material-ui/icons/DirectionsCar';



const styles = {
  menu: {
    float: "left",
    background: "-webkit-gradient(linear, left top, left bottom, color-stop(0%, rgba(18,53,255,1)), color-stop(100%, rgba(20,255,255,1)))", /* safari4+,chrome */
    width: "15%",
    height: "82%",
    position: "absolute", 
    marginLeft: "400px"
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
  },
  profile: {
    paddingTop: "20px",
    display: 'flex',
    justifyContent: 'space-evenly'
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
    if (currentShownComponent === "RegisteredUsers") {
      currentState = (<RegisteredUsers action={'sell'}/>)
    } else {
      currentState = (<UserProfile/>)
    }


    return (
      <div className = {classes.background}>
        <div className = {classes.menu}>
          <List component="nav">
          <ListItem button = {classes.sideButton} onClick = {this.handleChange("UserProfile")}>
          <ListItemIcon>
          <AssignemntIcon/>
          </ListItemIcon>
            <ListItemText primary = "UserProfile"/>
          </ListItem>
          <ListItem  fullWidth button = {classes.sideButton} onClick={this.handleChange("RegisteredUsers")}>
          <ListItemIcon>
          <CarIcon/>
          </ListItemIcon>
            <ListItemText primary = "RegisteredUsers"/>
          </ListItem>
          </List>
        </div>
        <div className = {classes.profile}>
          UCProfile
        </div>
        {currentState}
      </div>
    );
  }
}
export default withStyles(styles)(UCAccount);
