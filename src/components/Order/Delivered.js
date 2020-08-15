import React, { Component } from 'react'
import { withStyles } from "@material-ui/core/styles";
import { Typography, Button } from "@material-ui/core";
import ReactPaginate from 'react-paginate';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
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
  

class DeliveredOrder extends Component {
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

        fetch('https://dhols.herokuapp.com/admin/delivered', {
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
    
    render() {
        const {classes} = this.props;
        const slice = this.state.order.slice(this.state.offset, this.state.offset + this.state.perPage)
        const order = slice.map((item, index) => {
            return (

               
                



                <TableRow key={index}>
                    <TableCell align="center">{item.referenceid}</TableCell>
                    <TableCell align="center">
                        {item.sku.split(',').slice(0,4).map(sku => {
                            return <div><strong>{sku}</strong><br /></div>
                        })}
                    </TableCell>
                    <TableCell align="center">
                        {item.titles.split(',').slice(0,4).map(title => {
                            return <div><strong>{title}</strong><br /></div>
                        })}
                    </TableCell>
                    <TableCell align="center">{item.address}</TableCell>
                    <TableCell align="center">{item.mobile}</TableCell>
                    <TableCell align="center" style={{textTransform: 'capitalize'}}>{item.status}</TableCell>
                    <TableCell>
                        <Button variant="contained"size="small" color="primary"  href={'/order/'+item._id}>View</Button>
                    </TableCell>
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
                        {this.state.count} Orders Delivered
                    </Typography>

                </div>

                    <div style={{padding:'1rem',display:'flex', flexDirection:'column',justifyContent:'space-around', alignItems:'center'}}>
                      
                       <TableContainer className={classes.container} component={Paper}>
                        <Table className={classes.table} aria-label="simple table">
                            <TableHead style={{fontWeight:'bold'}}>
                            <TableRow>
                                
                                <TableCell align="center">Ref. Id</TableCell>
                                <TableCell align="center">SKU</TableCell>
                                <TableCell align="center">Title</TableCell>
                                <TableCell align="center">Address</TableCell>
                                <TableCell align="center">Mobile</TableCell>
                                <TableCell align="center">Status</TableCell>
                                <TableCell align="center">Action</TableCell>                    
                            </TableRow>
                            </TableHead>
                            <TableBody>
                            {order}
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
                    </div>
                </div>
            </div>
        )
    }
}


export default  withStyles(styles, {withThemes: true})(DeliveredOrder)


 