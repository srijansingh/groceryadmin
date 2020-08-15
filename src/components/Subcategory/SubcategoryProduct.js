import React, { Component } from 'react'
import { withStyles } from "@material-ui/core/styles";
import { Typography, Button } from "@material-ui/core";
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';
import AssignmentTurnedInIcon from '@material-ui/icons/AssignmentTurnedIn';
import ReactPaginate from 'react-paginate';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import { Link } from 'react-router-dom';

const token = localStorage.getItem('token');
const styles = (theme) => ({
    table: {
        minWidth: 800,
      },
      container: {
        maxHeight: 550,
      },
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        '& > *': {
          margin: theme.spacing(1),
          width: theme.spacing(16),
          height: theme.spacing(16),
        },
        
       
    }});
  

class SubProduct extends Component {
    constructor(){
        super();
        this.state = {
            isLoading : false,
            product:[],
            count:0,
            offset: 0,
            perPage: 10,
            currentPage: 0
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

        fetch('https://dhols.herokuapp.com/admin/subcategory/product/' + this.props.match.params._id, {
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
            console.log(response.data)
            this.setState({
                product:response.data,
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

    handleDelete = (id) => {
        fetch('https://server.dholpurshare.com/admin/product/'+id, {
              method: "DELETE",
              headers: {
                  "Accept": "application/json",
                  "Content-Type": "application/json",
                  Authorization: 'Bearer '+this.props.token
              }
          })
        .then(response => {
          this.setState({
            blogpost:false
          })
          alert("Deleted Successfully");
          window.location.reload(false);
        })
        .catch(err => {
         
          alert("Something went wrong")
        })
      }
  
      changeToInactive = (id) => {
        fetch('https://dhols.herokuapp.com/admin/status', {
            method: "PUT",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                Authorization: 'Bearer '+token
            },
            body: JSON.stringify({id:id, status:'inactive'})
        })
        .then(response => {
            this.setState({
            blogpost:false
            })
            alert("Status Updated Successfully");
            window.location.reload(false);
        })
        .catch(err => {
        
            alert("Something went wrong")
        })
      }


      changeToActive = (id) => {
        fetch('https://dhols.herokuapp.com/admin/status', {
            method: "PUT",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                Authorization: 'Bearer '+token
            },
            body: JSON.stringify({id:id, status:'active'})
        })
        .then(response => {
            this.setState({
            blogpost:false
            })
            alert("Status Updated Successfully");
            window.location.reload(false);
        })
        .catch(err => {
        
            alert("Something went wrong")
        })
      }


    render() {
        const {classes} = this.props;

        const slice = this.state.product.slice(this.state.offset, this.state.offset + this.state.perPage)
        const product = slice.map((item, index) => {
            let status;
            if(item.status === 'active'){
                status = <Button variant="contained"size="small" color="primary" onClick={() =>{if(window.confirm('Are you sure? The product will be Unavailable for customers.')) {this.changeToInactive(item._id)};}}>Available</Button>
            }
            else{
                status = <Button variant="contained"size="small" color="secondary" onClick={() =>{if(window.confirm('Status will be changed to Available?')) {this.changeToActive(item._id)};}}>Unavailable</Button>
            }
            return (
                <TableRow key={index}>
                    <TableCell component="th" scope="row">
                     {item.sku}
                    </TableCell>
                    <TableCell align="right"><img src={item.imageurl} height='60px' /></TableCell>
                    <TableCell align="right">{item.title}</TableCell>
                    <TableCell align="right">{item.sellingprice}</TableCell>
                    <TableCell align="right">{item.costprice}</TableCell>
                    <TableCell align="right">{status}</TableCell>
                    <TableCell align="right">
                        <Button size="small" variant="contained" color="secondary" startIcon={<DeleteIcon />}  onClick={() =>{if(window.confirm('Delete the item?')) {this.handleDelete(item._id)};}}>Delete</Button>
                       
                    </TableCell>

                    <TableCell>
                    <Button variant="contained"size="small" color="primary" startIcon={<EditIcon/>} href={'/product/'+item._id}>Edit</Button>
                    </TableCell>
                </TableRow>
            )
        })

        return (
            <div className="view-container">
                <div>
                <div style={{background:'rgb(50, 70, 246)', padding:'0.8rem', display:'flex', justifyContent:'space-between'}}>
                    
                    <Typography style={{color:'white'}}>
                        Product 
                    </Typography>

                    <Typography style={{color:'white'}}>
                    {
                            this.state.isLoading ? 'Loading...' : this.state.count +' Products'
                        }
                    </Typography>

                </div>

                    <Paper elevation={3} style={{padding:'1rem',display:'flex', flexDirection:'column',justifyContent:'space-around', alignItems:'center'}}>
                       <TableContainer component={Paper}>
                        <Table className={classes.table} aria-label="simple table">
                            <TableHead style={{fontWeight:'bold'}}>
                            <TableRow>
                                <TableCell>SKU</TableCell>
                                <TableCell align="center">Preview</TableCell>
                                <TableCell align="center">Title</TableCell>
                                <TableCell align="center">SP</TableCell>
                                <TableCell align="center">CP</TableCell>
                                <TableCell align="center" colSpan={3}>Action</TableCell>                    
                            </TableRow>
                            </TableHead>
                            <TableBody>
                                {product}
                            </TableBody>
                        </Table>
                        </TableContainer>

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
                    </Paper>
                </div>
            </div>
        )
    }
}


export default  withStyles(styles, {withThemes: true})(SubProduct)

