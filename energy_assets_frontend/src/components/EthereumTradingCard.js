import React, { Component } from 'react';

import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Slider from 'material-ui-slider-label/Slider';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import Dropdown from './Dropdown'
import web3 from './BlockchainWrappers/Web3';
import abi from './BlockchainWrappers/Abi'


const styles = {
  slider: {
    padding: 20,
    width: "80%",
    marginLeft: "auto",
    marginRight: "auto",
  },
  card: {
    width: "60%",
    height: "70%"
  },
  labelStyleOuter: {
    width: '30px',
    height: '30px',
    borderRadius: '50% 50% 50% 0',
    background: "-webkit-linear-gradient(335deg, rgba(30,214,128,1) 0%, rgba(23,173,60,1) 100%)", /* safari5.1+,chrome10+ */
    position: 'absolute',
    transform: 'rotate(-45deg)',
    top: '-40px',
    left: '-9px',
  },
  labelStyleInner: {
    transform: 'rotate(45deg)',
    color: 'white',
    textAlign: 'center',
    position: 'relative',
    top: '8px',
    right: '0px',
    fontSize: '13px',
  },
  etherCard: {
    width: "80%",
    marginLeft: "auto",
    marginRight: "auto",
  },
  etherEntry: {
    float: "left"
  },
  continueButton: {
    background: "-webkit-linear-gradient(335deg, rgba(30,214,128,1) 0%, rgba(23,173,60,1) 100%)", /* safari5.1+,chrome10+ */
    color: "white",
  },
  continueButtonWrapper: {
    paddingLeft: "40%",
    paddingTop: "5%",
    paddingBottom: "5%"
  },
  conversion: {
    paddingLeft: "25%",
  }

}

const muiTheme = getMuiTheme({
  slider: {
    selectionColor: 'green'
  },
});


class EthereumTradingCard extends Component {
  state = {
    value: 0.1,
    etherAmount: 1,
    energyCertificate: 1
  };


  handleChangeSlider = (event, value) => {
    this.setState({ value });
  };

  handleChangeEther = prop => event => {
   this.setState({ [prop]: event.target.value });
  };

  handleTransaction = event => {

  }

  render() {
    const { classes } = this.props;
    const { value } = this.state;

    return (
      <Card className = {classes.card}>
          <MuiThemeProvider muiTheme={muiTheme}>
            <Slider
            className = {classes.slider}
            max = {1.15}
            step= {0.1}
            value={value}
            aria-labelledby="label"
            label={
              <div style={styles.labelStyleOuter}>
                <div style={styles.labelStyleInner}>
                  {value}
                </div>
              </div>
            }
            onChange={this.handleChangeSlider} />
          </MuiThemeProvider>
          <Card className = {classes.etherCard}>
              <CardContent className={classes.etherEntry}>
                <FormControl fullWidth error={this.state.isErrorState} >
                  <Input
                    id="adornment-amount"
                    value={this.state.etherAmount}
                    onChange={this.handleChangeEther('etherAmount')}
                    startAdornment={<InputAdornment position="start">$</InputAdornment>}
                  />
               </FormControl>
              </CardContent>
              <Dropdown menuItems = {["Ether", "Bitcoin", "DogeCoin"]}/>
          </Card>
          <CardContent className = {classes.conversion}>
            <Typography variant="body1" >
              For 1 Ether you will get 1 Energy Cerifiicate
            </Typography>
          </CardContent>
          <Card className = {classes.etherCard}>
              <CardContent className={classes.etherEntry}>
                <FormControl fullWidth error={this.state.isErrorState} >
                  <Input
                    id="adornment-amount"
                    value={this.state.etherAmount}
                    onChange={this.handleChangeEther('etherAmount')}
                    startAdornment={<InputAdornment position="start">$</InputAdornment>}
                  />
               </FormControl>
              </CardContent>
              <Dropdown menuItems = {["REC", "LCFS", "LMNOP"]}/>
          </Card>
          <div className = {classes.continueButtonWrapper}>
            <Button variant="contained" className = {classes.continueButton} onClick = {this.handleTransaction}>
              Continue
            </Button>
          </div>
          </Card>

    );
  }
}
export default withStyles(styles)(EthereumTradingCard);
