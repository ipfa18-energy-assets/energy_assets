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


class RegisterVE extends Component {
  state = {
    name: "David Chi",
    car1: "JGSA564",
    car2: "HAS7650"
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
              label="Car"
              className={classes.textField}
              value={this.state.car1}
              margin="normal"
              variant="outlined"
            />
          </div>
          <div>
            <TextField
              label="Car"
              className={classes.textField}
              value={this.state.car2}
              margin="normal"
              variant="outlined"
            />
          </div>
        <div>
          <div>
            <Button variant="contained" className = {classes.button}>
              Add
            </Button>
          </div>
        </div>
      </div>
    );
  }
}
export default withStyles(styles)(RegisterVE);
