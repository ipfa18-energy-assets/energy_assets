// src/components/Feed.js
import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom'


const styles = {
  mainCard: {
    width: "100%",
    height: "80%",
    position: "absolute",
    background: "linear-gradient(-180deg, #2D61D1 0%, #0FA8A4 81%)", /* safari4+,chrome */
    filter: "progid:DXImageTransform.Microsoft.gradient( startColorstr='#1ED680', endColorstr='#17AD3C',GradientType=1 )" /* ie6-9 */
  },
  topText: {
    paddingTop: "10px",
    paddingLeft: "200px",
    color: "white",
    float: "left"
  },
  signIn: {
    paddingTop: "10px",
    color: "white",
    float: "right",
    position: "relative"
  },
  signInText: {
    paddingTop: "10px",
    color: "white",
  },
  topBox: {
    paddingTop: "10px",
    width: "1300px",// This controls how far right sign in is
  },
  tagline: {
    paddingTop: "200px",
    color: "white"
  },
  lowerWrapper: {
    width: "100%",
    paddingLeft: "300px",
    display: "flex",
    justifyContent: "space-between"
  }


}

class SplashPage extends Component {

    render() {

      const { classes } = this.props

      return (
            <div className = {classes.mainCard} >
                <div className = {classes.topBox}>
                  <Typography className = {classes.topText} variant="headline">
                  </Typography>
                  <Button className = {classes.signIn} color="inherit" component={Link} to="/login">
                    <Typography  className = {classes.signInText} variant="headline">
                      Sign In ->
                    </Typography>
                  </Button>
                </div>
                <div className={classes.lowerWrapper}>
                  <div className = {classes.leftLower}>
                    <div className = {classes.tagline}>
                      <font size="8" >Buy Energy More Efficiently</font>
                    </div>
                  </div>
                  <div>
                  </div>
                </div>
            </div>
        )


    }
}


export default withStyles(styles)(SplashPage);
