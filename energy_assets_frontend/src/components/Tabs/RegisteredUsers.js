import React, { Component } from 'react';

import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';



const styles = {
  history: {
    float: "left"
  }

}


class RegisteredUsers extends Component {
  state = {
  };


  createData(name, ve, register_date, credits) {
    return {name, ve, register_date, credits };
  }


  render() {
    const { classes } = this.props;
    const rows = [
      this.createData("David", "HAS7650", "11/02/18", 2),
      this.createData("James", "HAS7650", "11/02/18", 3),
      this.createData("Kate", "JGSA564", "11/01/18", 223),
      this.createData("Jenny", "JGSA564", "10/30/18", 3),
    ];

    var i = 0

    return (
      <div className = {classes.history}>
        <Paper className={classes.root}>
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <TableCell numeric>User Name</TableCell>
                <TableCell numeric>VE</TableCell>
                <TableCell numeric>Register Date</TableCell>
                <TableCell numeric>Credits</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map(row => {
                return (
                  <TableRow key={i++}>
                    <TableCell component="th" scope="row">{row.name} </TableCell>
                    <TableCell numeric>{row.ve}</TableCell>
                    <TableCell numeric>{row.register_date}</TableCell>
                    <TableCell numeric>{row.credits}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Paper>
      </div>
    );
  }
}
export default withStyles(styles)(RegisteredUsers);
