import React, {Component} from "react";
import { withStyles } from "@material-ui/core/styles";
import { Typography, Button } from "@material-ui/core";
import CountComponent from "./component/countComponent";
import { Link } from "react-router-dom";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const styles = (theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        '& > *': {
          margin: theme.spacing(1),
          width: theme.spacing(16),
          height: theme.spacing(16),
        },
       
    }});
  

class  Dashboard extends Component {
    constructor(){
        super();
        this.state = {
            isLoading: false,
            all:0,
            category:0,
            brand:0,
            active:0,
           order:[]
        }
    }

    componentDidMount(){
        this.setState({
            isLoading:true
        });

        fetch('https://server.dholpurshare.com/admin/order', {
            method: "GET",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                Authorization: 'Bearer '+this.props.token
            }
        })
        .then(res => {
            if(res.status !==200){
                throw new Error('Failed to fetch the product')
            }
            return res.json()
        }).then(response => {
            console.log(response.data)
            this.setState({
                order:response.data,
                isLoading:false
            }) 
        })
        .catch(err => {
            this.setState({
              isLoading:false
            })
        })
                
    }
    



       
    render(){

        const {classes} = this.props;
        const order = this.state.order.slice(0,5).map((item, index) => {
            return (
                <TableRow key={item._id}>
                    <TableCell component="th" scope="row">
                        {index+1}
                    </TableCell>
                    <TableCell component="th" scope="row">
                        {item.referenceid}
                    </TableCell>
                    <TableCell align="right">{item.mobile}</TableCell>
                    <TableCell align="right">{item.status}</TableCell>
                    <TableCell align="right"><Button color="primary"  style={{ textDecoration:'none', color:'blue'}}  size="small" href={'/order/'+item._id}>View</Button></TableCell>
                </TableRow>
            )
        })


        return (
            <div>
            <div style={{background:'rgb(50, 70, 246)', padding:'0.8rem'}}>
               
                <Typography style={{color:'white'}}>
                  Dashboard
               </Typography>

               
                
            </div>
            <div style={{
                
               
                display:'flex',
                flexDirection:'row',
                flexWrap:'wrap',
                padding:'0.5rem',
               
                justifyContent:'space-between'
                }}>
                <CountComponent total={this.state.all} brand={this.state.brand} category={this.state.category} active={this.state.active} />
            </div>
            <div>
                <div style={{padding:'1rem'}}>
            <Paper elevation={3} style={{ padding:'1rem', width:'600px', minHeight:'400px'}}>
                <div style={{display:'flex', justifyContent:'space-between'}}>
                <Typography style={{color:'black', fontWeight:'bold', padding:'0.5rem 0',background:'white'}}>Recent Orders</Typography>
                <Link style={{color:'blue',textDecoration:'none', fontWeight:'bold', padding:'0.5rem 0'}} href="#">View Pending Orders</Link>
                </div>
                <TableContainer component={Paper}>
                    <Table className={classes.table} aria-label="simple table">
                        <TableHead>
                        <TableRow>
                            <TableCell>S.No</TableCell>
                            <TableCell align="right">Ref ID</TableCell>
                            <TableCell align="right">Mobile</TableCell>
                            <TableCell align="right">Status</TableCell>
                            <TableCell align="right">Action</TableCell>
                        </TableRow>
                        </TableHead>
                        <TableBody>
                           {order}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
            </div>
            </div>
            </div>
        ) 
    }
        
   
}

export default withStyles(styles, {withThemes: true})(Dashboard);