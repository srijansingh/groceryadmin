import React, { Component } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

export default class CustomerComponent extends Component {
    render() {
        return (


                <TableRow key={this.props.index}>
                    <TableCell align="center">{this.props.name}</TableCell>
                    <TableCell align="center">{this.props.email}</TableCell>
                    <TableCell align="center">{this.props.mobile}</TableCell>
                    <TableCell align="center">{this.props.address}</TableCell>
                    <TableCell align="center">{this.props.pincode}</TableCell>
                </TableRow>
        )
    }
}
