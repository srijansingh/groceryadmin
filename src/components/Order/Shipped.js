import React, { Component } from 'react'
import { withStyles } from "@material-ui/core/styles";
import { Typography, Button, Divider, CircularProgress } from "@material-ui/core";
import ReactPaginate from 'react-paginate';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import moment from 'moment';
import Paper from '@material-ui/core/Paper';

import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import "./ViewOrder.css";

const styles = (theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        '& > *': {
          margin: theme.spacing(1),
          width: theme.spacing(16),
          height: theme.spacing(16),
        }
    }});
  

class ShippedOrder extends Component {
    constructor(){
        super();
        this.state = {
            isLoading : false,
            order:[],
            id:null,
            status:null,
            count:0,
            offset: 0,
            perPage: 10,
            currentPage: 0,
            
            isStarted:false,
            selected:false,
            product:[],
            orderstatus:null,
            orderdate:null,
            updatedate:null,
            ordervalue:null,
            referenceid:null,
            mobile:null,
            address:null
        };

        this.handlePageClick = this
        .handlePageClick
        .bind(this);
    }

    componentDidMount(){
        this.receivedData()
                
    }

   
    receivedData = () => {
        this.setState({
            isLoading:true
        });

        fetch('https://server.dholpurshare.com/admin/shipped', {
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
                count:response.data.length,
                pageCount: Math.ceil(response.data.length / this.state.perPage),
                isLoading:false
            }) 
        })
        .catch(err => {
            this.setState({
              isLoading:false
            })
        })
    }

    handlePageClick = (e) => {
        const selectedPage = e.selected;
        const offset = selectedPage * this.state.perPage;

        this.setState({
            currentPage: selectedPage,
            offset: offset
        }, () => {
            this.receivedData()
        });

    };

    handleOrders = (ref) => {
        this.setState({
            isStarted:true,
            selected:true
        });
        console.log(ref)
        fetch('https://server.dholpurshare.com/admin/order/'+ref, {
            method: "GET",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                Authorization: 'Bearer '+ this.props.token
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
                orderstatusstatus:response.data[0].status,
                referenceid:response.data[0].referenceid,
                mobile:response.data[0].mobile,
                address:response.data[0].address,
                ordervalue:response.data[0].totalcost,
                orderdate:response.data[0].createdAt,
                orderstatus:response.data[0].status,
                status:response.data[0].status,
                updatedate:response.data[0].updatedAt,
                product:response.data,
                isStarted:false
            }) 
        })
        .catch(err => {
            this.setState({
                isStarted:false
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
                Authorization:'Bearer '+ this.props.token
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


        let ProductList;

        if(this.state.selected === null){
            ProductList = (
                <div>
                <Paper elevation={3} style={{height:'70vh', width:'100%', display:'flex',alignItems:'center', justifyContent:'space-around'}}>
                    <div style={{color:'#a6a6a6',fontSize:'1.2rem',fontWeight:'bold'}}>Choose Order to Monitor</div>
                </Paper>
            </div>
            
            );
        }
       else if(this.state.isStarted){
        ProductList= (
            <div >
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

        const {classes} = this.props;
        const slice = this.state.order.slice(this.state.offset, this.state.offset + this.state.perPage)
        const order = slice.map((item, index) => {
            return (
                <TableRow key={index}>
                    <TableCell component="th" scope="row">
                        {index+1}
                    </TableCell>
                    <TableCell component="th" scope="row" align="center">
                        <b>#{item}</b>
                    </TableCell>
                    <TableCell align="right"><Button color="primary"  style={{ textDecoration:'none', color:'blue'}}  size="small" onClick={() => this.handleOrders(item)}>View</Button></TableCell>
                </TableRow>
            )
        })
        return (
            <div>
                <div>
                <div style={{background:'rgb(50, 70, 246)', padding:'0.8rem', display:'flex', justifyContent:'space-between'}}>
                    
                    <Typography style={{color:'white'}}>
                        Orders
                    </Typography>

                    <Typography style={{color:'white'}}>
                    {
                            this.state.isLoading ? 'Loading...' : this.state.count +' Shipped Order'
                        } 
                    </Typography>

                </div>

                    <div style={{padding:'1rem',display:'flex', flexDirection:'column'}}>
                      <div style={{display:'flex', flexDirection:'row', justifyContent:'space-between' }}>
                       <TableContainer  className={classes.container} style={{ padding:'1rem', maxWidth:'300px', minHeight:'80vh', display:'flex', flexDirection:'column', justifyContent:'space-between', alignItems:'center'}} component={Paper}>
                        
                        <Table className={classes.table} aria-label="simple table">
                            <TableHead style={{fontWeight:'bold'}}>
                            <TableRow>
                                
                                <TableCell>S.No</TableCell>
                                <TableCell align="center">Order ID</TableCell>
                                <TableCell align="right">Action</TableCell>                   
                            </TableRow>
                            </TableHead>
                            <TableBody>
                            {order}
                            </TableBody>
                        </Table>

                        <ReactPaginate
                            previousLabel={"prev"}
                            nextLabel={"next"}
                            breakLabel={"..."}
                            breakClassName={"break-me"}
                            pageCount={this.state.pageCount}
                            marginPagesDisplayed={2}
                            pageRangeDisplayed={5}
                            onPageChange={this.handlePageClick}
                            containerClassName={"pagination"}
                            subContainerClassName={"pages pagination"}
                            activeClassName={"active"}
                        />
                        </TableContainer>
                    {
                        this.state.selected 
                        ?

                    
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
                            <TableContainer className={classes.container} style={{ padding:'1rem 0'}}>
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
                                    <option value='shipped'>Shipped</option>
                                    <option value='delivered'>Delivered</option>
                                    </Select>
                                </FormControl>
                                <Button style={{width:'120px'}} color="primary" variant="contained" onClick={() => {this.handleUpdate(this.state.referenceid)}}>Update</Button>
                                </div>
                            </Paper>

                        </Paper>

                        :
                        <Paper elevation={1} style={{height:'90vh', width:'700px', display:'flex',alignItems:'center', justifyContent:'space-around'}}>
                        <div style={{color:'#a6a6a6',fontSize:'1.2rem',fontWeight:'bold'}}>Choose Order to Monitor</div>
                    </Paper>
                        
                    }
                    </div>
                       
                    </div>
                </div>
            </div>
        )
    }
}


export default  withStyles(styles, {withThemes: true})(ShippedOrder)


 