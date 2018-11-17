import React, { Component } from 'react';

import { withStyles } from '@material-ui/core/styles';
import Popper from '@material-ui/core/Popper';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import Grow from '@material-ui/core/Grow';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';


const styles = {
  button: {
    float: "right",
    paddingRight: "30%",
    paddingTop: "2%",
  },

}


class Dropdown extends Component {
  state = {
    open: false,
    title: this.props.menuItems[0]
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

  handleChange = (input) => (e) => {
    this.setState({ title: input })
    this.setState({ open: false });
  };

  render() {
    const { classes } = this.props;
    const { open, title } = this.state;

    const menuItems = this.props.menuItems.map((menuitem) =>
      <MenuItem onClick={this.handleChange(menuitem)}>{menuitem}</MenuItem>
    )

    return (
        <div>
          <div className = {classes.button}>
            <Button
              buttonRef={node => {
                this.anchorEl = node;
              }}
              aria-owns={open ? 'menu-list-grow' : undefined}
              aria-haspopup="true"
              onClick={this.handleToggle}
            >
              {title}
            </Button>
          </div>
          <Popper open={open} anchorEl={this.anchorEl} transition disablePortal>
            {({ TransitionProps, placement }) => (
              <Grow
                {...TransitionProps}
                id="menu-list-grow"
                style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
              >
                <Paper>
                  <ClickAwayListener onClickAway={this.handleClose}>
                    <MenuList>
                      {menuItems}
                    </MenuList>
                  </ClickAwayListener>
                </Paper>
              </Grow>
            )}
          </Popper>
        </div>

    );
  }
}
export default withStyles(styles)(Dropdown);
