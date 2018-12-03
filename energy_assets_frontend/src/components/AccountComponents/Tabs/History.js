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
    float: "right",
    position: "relative",
    marginleft: "200px"
  }

}


class History extends Component {
  state = {
  };


  createData(time, ve, register_date, credits) {
    return {time, ve, register_date, credits };
  }


  render() {
    const { classes } = this.props;
    const rows = [
      this.createData(21.3, "HAS7650", "11/02/18", 2),
      this.createData(21.3, "HAS7650", "11/02/18", 3),
      this.createData(21.3, "JGSA564", "11/01/18", 223),
      this.createData(21.3, "JGSA564", "10/30/18", 3),
    ];

    var i = 0

    return (
      <div className = {classes.history}>
        <Paper className={classes.root}>
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <TableCell numeric>Time</TableCell>
                <TableCell numeric>VE</TableCell>
                <TableCell numeric>Register Date</TableCell>
                <TableCell numeric>Credits</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map(row => {
                return (
                  <TableRow key={i++}>
                    <TableCell component="th" scope="row">{row.time} </TableCell>
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
export default withStyles(styles)(History);
