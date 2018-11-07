import React, { Component } from 'react';

import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';
import { Link } from 'react-router-dom'
import Slider from 'material-ui-slider-label/Slider';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import Popper from '@material-ui/core/Popper';
import Button from '@material-ui/core/Button';
import Fade from '@material-ui/core/Fade';
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import Grow from '@material-ui/core/Grow';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';


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
  etherButton: {
    float: "right",
    paddingRight: "30%",
    paddingTop: "2%",
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
    paddingTop: "5%"
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


class Login extends Component {
  state = {
    value: 0.1,
    etherAmount: 1,
    energyCertificate: 1,
    open: false,
    coin: "Ether",
    energy: "REC"
  };

  handleToggle = () => {
    this.setState(state => ({ open: !state.open }));
  };

  handleClose = event => {
    if (this.anchorEl.contains(event.target)) {
      return;
    }

    this.setState({ open: false });
  };

  handleCoinChange = (coin) => (e) => {
    this.setState({ coin: coin })
    this.setState({ open: false });

  };

  handleEnergyChange = (energy) => (e) => {
    this.setState({ energy: energy })
    this.setState({ open: false });
  };

  handleChangeSlider = (event, value) => {
    this.setState({ value });
  };

  handleChangeEther = prop => event => {
   this.setState({ [prop]: event.target.value });
  };

  render() {
    const { classes } = this.props;
    const { value, open, coin, energy } = this.state;

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
              <div className = {classes.etherButton}>
                <Button
                  buttonRef={node => {
                    this.anchorEl = node;
                  }}
                  aria-owns={open ? 'ether-menu-list-grow' : undefined}
                  aria-haspopup="true"
                  onClick={this.handleToggle}
                >
                  {coin}
                </Button>
              </div>
              <Popper open={open} anchorEl={this.anchorEl} transition disablePortal>
                {({ TransitionProps, placement }) => (
                  <Grow
                    {...TransitionProps}
                    id="ether-menu-list-grow"
                    style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
                  >
                    <Paper>
                      <ClickAwayListener onClickAway={this.handleClose}>
                        <MenuList>
                          <MenuItem onClick={this.handleCoinChange('Ether')}>Ether</MenuItem>
                          <MenuItem onClick={this.handleCoinChange('Bitcoin')}>Bitcoin</MenuItem>
                          <MenuItem onClick={this.handleCoinChange('Dogecoin')}>Dogecoin</MenuItem>
                        </MenuList>
                      </ClickAwayListener>
                    </Paper>
                  </Grow>
                )}
              </Popper>
          </Card>
          <CardContent className = {classes.conversion}>
            <Typography variant="p" >
              For 1 {coin} you will get 1 Energy Cerifiicate
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
              <div  className = {classes.etherButton}>
                <Button
                  buttonRef={node => {
                    this.anchorEl = node;
                  }}
                  aria-owns={open ? 'energy-menu-list-grow' : undefined}
                  aria-haspopup="true"
                  onClick={this.handleToggle}
                >
                  {energy}
                </Button>
              </div>
              <Popper open={open} anchorEl={this.anchorEl} transition disablePortal>
                {({ TransitionProps, placement }) => (
                  <Grow
                    {...TransitionProps}
                    id="energy-menu-list-grow"
                    style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
                  >
                    <Paper>
                      <ClickAwayListener onClickAway={this.handleClose}>
                        <MenuList>
                          <MenuItem onClick={this.handleEnergyChange('REC')}>REC</MenuItem>
                          <MenuItem onClick={this.handleEnergyChange('Hamster Wheel')}>Hamster Whell</MenuItem>
                          <MenuItem onClick={this.handleEnergyChange('Static')}>Static</MenuItem>
                        </MenuList>
                      </ClickAwayListener>
                    </Paper>
                  </Grow>
                )}
              </Popper>
          </Card>
          <div className = {classes.continueButtonWrapper}>
            <Button variant="contained" className = {classes.continueButton}>
              Continue
            </Button>
          </div>
          </Card>

    );
  }
}
export default withStyles(styles)(Login);
