import React, { Component } from 'react'
import { withStyles } from "@material-ui/core/styles";
import { Typography, Button, Divider, CircularProgress } from "@material-ui/core";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import moment from 'moment';
import Paper from '@material-ui/core/Paper';

import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import NativeSelect from '@material-ui/core/NativeSelect';
import "./ViewOrder.css";

const styles = (theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 200,
      },
      selectEmpty: {
        marginTop: theme.spacing(2),
      },
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        '& > *': {
          margin: theme.spacing(1),
          width: theme.spacing(16),
          height: theme.spacing(16),
        }
    }});
  
    const token = localStorage.getItem('token');
class SingleOrder extends Component {
    constructor(){
        super();
        this.state = {
            isLoading : false,
            id:null,
          
            product:[],
            status:null,
            orderdate:null,
            updatedate:null,
            ordervalue:null,
            referenceid:null,
            mobile:null,
            address:null

        }
    }

    componentDidMount(){
        this.setState({
            isLoading:true
        });

        fetch('https://server.dholpurshare.com/admin/order/'+this.props.match.params.id, {
            method: "GET",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                Authorization: 'Bearer '+ token
            }
        })
        .then(res => {
            if(res.status !==200){
                throw new Error('Failed to fetch the product')
            }
            return res.json()
        }).then(response => {
            console.log(response.data.address)
            this.setState({
                referenceid:response.data[0].referenceid,
                mobile:response.data[0].mobile,
                address:response.data[0].address,
                ordervalue:response.data[0].totalcost,
                orderdate:response.data[0].createdAt,
                status:response.data[0].status,
                orderstatus:response.data[0].status,
                updatedate:response.data[0].updatedAt,
                product:response.data,
                isLoading:false
            }) 
        })
        .catch(err => {
            this.setState({
              isLoading:false
            })
        })
                
    }

    handleUpdate = (e) => {
        this.setState({
            isLoading:true
        })
        console.log(e)
        fetch('https://server.dholpurshare.com/admin/order', {
            method: "PUT",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                Authorization:'Bearer '+ token
            },
            body: JSON.stringify({status:this.state.status, id:e})
        }).then(result => {
            result.json().then(response => {
                
                this.setState({
                    isLoading: false
                })
                alert('Status Updated Successfully')
                window.location.reload(false);
                
            })
        }).catch(err => {
            alert("Something went wrong")
            this.setState({
                isLoading: false,
                error: err
            });
        });  
    }
    
    render() {
        const {classes} = this.props;
        let checkStatus;

        if(this.state.status!=='delivered'){
            checkStatus = (
                <select onChange={(event)=>{this.setState({status:event.target.value})}}>
                                    <option selected value={this.state.status} >{this.state.status}</option>
                                    <option disabled>Status</option>
                                    <option value='processing'>Processing</option>
                                    <option value='confirmed'>Confirm</option>
                                    <option value='shipped'>Shipped</option>
                                    <option value='delivered'>Delivered</option>

                                </select>
            )
        }
        else{
            checkStatus = (
                <div style={{color:'green', fontSize:'20px', fontWeight:'bold'}}>Delivered</div>
            )
        }

        
        let ProductList;
        if(this.state.isStarted){
        ProductList= (
            <div>
                <CircularProgress />
            </div>
            )
        }

        else{
            ProductList = this.state.product.map((item, index) => {
                return (
                    <TableRow key={index}>
                        <TableCell  scope="row">
                            {index+1}
                        </TableCell>
                        <TableCell  scope="row" align="center">
                            <b>{item.sku}</b>
                        </TableCell>
                        <TableCell  scope="row" align="center">
                            <img src={item.imageurls} height="35px" />
                        </TableCell>
                        <TableCell  scope="row" align="center">
                            {item.titles}
                        </TableCell>
                        <TableCell  scope="row" align="center">
                            {item.sellingprice}
                        </TableCell>
                        <TableCell scope="row" align="center">
                            {item.quantity}
                        </TableCell>
                        <TableCell  scope="row" align="center">
                            {item.sellingprice * item.quantity}
                        </TableCell>
                        
                    </TableRow>
                )
            })
        }

        return (
            <div>
                <div>
                    <div style={{background:'rgb(50, 70, 246)', padding:'0.8rem'}}>
                    
                        <Typography style={{color:'white'}}>
                            Reference ID : <b>#{this.state.referenceid}</b>
                        </Typography>

                        
                    </div>

                    <div style={{padding:'1rem'}}>
                        <Paper elevation={1} style={{width:'700px'}}>
                            <div style={{display:'flex', padding:'0 1rem', height:'50px', justifyContent:'space-between', alignItems:'center'}}>
                                <Typography>Order ID : <b>#{this.state.referenceid}</b></Typography>   
                                <Typography>Order Date : {moment(this.state.orderdate).format('DD MMMM YYYY, HH:MM')}</Typography>   
                            </div>
                            <Divider />
                            <div style={{padding:'0.5rem 1rem',display:'flex',flexDirection:'column', height:'120px', justifyContent:'space-between'}}>
                                <span style={{display:'flex', justifyContent:'space-between'}}><Typography>Order Status</Typography><Typography style={{textTransform: 'capitalize', color:'#8cf644', fontWeight:'bold'}}>{this.state.orderstatus}</Typography></span>   
                                <span style={{display:'flex', justifyContent:'space-between'}}><Typography>Delivered Date</Typography><Typography style={{textTransform: 'capitalize', fontWeight:'bold'}}>{moment(this.state.updatedate).format('DD MMMM YYYY')}</Typography></span> 
                                <span style={{display:'flex', justifyContent:'space-between'}}><Typography>Order Value</Typography><Typography style={{textTransform: 'capitalize', color:'#000', fontWeight:'bold'}}>{this.state.ordervalue}</Typography></span>  
                                <span style={{display:'flex', justifyContent:'space-between'}}><Typography>Address</Typography><Typography style={{textTransform: 'capitalize', color:'#000', fontSize:'15px'}}>{this.state.address}</Typography></span>  
                                <span style={{display:'flex', justifyContent:'space-between'}}><Typography>Mobile</Typography><Typography>{this.state.mobile}</Typography></span>  
                            </div>
                            <Divider />
                            <TableContainer className={classes.container} style={{ padding:'0'}}>
                            <Table className={classes.table} aria-label="simple table">
                                <TableHead style={{fontWeight:'bold'}}>
                                <TableRow>
                                    
                                    <TableCell>S.No</TableCell>
                                    <TableCell align="center">SKU</TableCell>
                                    <TableCell align="center">Image</TableCell>
                                    <TableCell align="center">Title</TableCell> 
                                    <TableCell align="center">SP</TableCell>   
                                    <TableCell align="center">Quantity</TableCell> 
                                    <TableCell align="center">Total</TableCell>              
                                </TableRow>
                                </TableHead>
                                <TableBody>
                                    {ProductList}
                                </TableBody>
                            </Table>
                            </TableContainer>
                            <Paper style={{padding:'0 1rem',height:'100px',  display:'flex',alignItems:'center', justifyContent:'space-between'}}>
                                <Typography component="h2">Change Status</Typography>
                                <div style={{width:'320px',display:'flex',alignItems:'center', justifyContent:'space-between'}}>
                                <FormControl  className={classes.formControl}>
                                    <Select  native value={this.state.status}  label="Status" onChange={(event)=>{this.setState({status:event.target.value})}}
                                    inputProps={{
                                        name: 'status',
                                        id: 'outlined-age-native-simple',
                                    }}
                                    >
                                    <option selected value={this.state.status} >{this.state.status}</option>
                                    <option disabled>Status</option>
                                    <option value='processing'>Processing</option>
                                    <option value='confirmed'>Confirm</option>
                                    <option value='shipped'>Shipped</option>
                                    <option value='delivered'>Delivered</option>
                                    </Select>
                                </FormControl>
                                <Button style={{width:'120px'}} color="primary" variant="contained" onClick={() => {this.handleUpdate(this.state.referenceid)}}>Update</Button>
                                </div>
                            </Paper>
                       </Paper>
                    </div>
                </div>
            </div>
        )
    }
}


export default  withStyles(styles, {withThemes: true})(SingleOrder)


 