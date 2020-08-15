import React, { Component } from 'react'
import { withStyles } from "@material-ui/core/styles";
import { Typography, Button } from "@material-ui/core";
import DeleteIcon from '@material-ui/icons/Delete';
import VisibilityIcon from '@material-ui/icons/Visibility';

import "./ViewCategory.css";
import ReactPaginate from 'react-paginate';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const styles = (theme) => ({
    table: {
       
      },
      container: {
        maxWidth: 600,
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
  

class ViewCategory extends Component {
    constructor(){
        super();
        this.state = {
            isLoading : false,
            category:[],
            count:0,
            offset: 0,
            perPage: 15,
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

        fetch('https://server.dholpurshare.com/admin/category', {
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
                category:response.data,
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
        fetch('https://server.dholpurshare.com/admin/category/'+id, {
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
  
    
    render() {

        const {classes} = this.props;
        const slice = this.state.category.slice(this.state.offset, this.state.offset + this.state.perPage)
        const category = slice.map((item, index) => {
            return (


                <TableRow key={index}>
                    <TableCell align="center"><img src={item.imageurl} height='60px' /></TableCell>
                    <TableCell align="center">{item.category}</TableCell>
                    <TableCell align="center">
                        <Button size="small" variant="contained" color="secondary" startIcon={<DeleteIcon />}  onClick={() =>{if(window.confirm('Delete the item?')) {this.handleDelete(item._id)};}}>Delete</Button>
                    
                    </TableCell>

                    <TableCell>
                        <Button variant="contained"size="small" color="primary" startIcon={<VisibilityIcon/>} href={'/category/'+item._id}>View</Button>
                    </TableCell>
                </TableRow>
            )
        })
        return (
            <div>
                <div>
                    <div style={{background:'rgb(50, 70, 246)', padding:'0.8rem', display:'flex', justifyContent:'space-between'}}>
                    
                        <Typography style={{color:'white'}}>
                            Product Category
                        </Typography>

                        <Typography style={{color:'white'}}>
                        {
                            this.state.isLoading ? 'Loading...' : this.state.count +' Categories'
                        }
                        </Typography>

                    </div>

                    <div style={{padding:'1rem',display:'flex', flexDirection:'column',justifyContent:'space-around', alignItems:'center'}}>
                       

                       <TableContainer className={classes.container} component={Paper}>
                        <Table className={classes.table} aria-label="simple table">
                            <TableHead style={{fontWeight:'bold'}}>
                            <TableRow>
                                
                                <TableCell align="center">Preview</TableCell>
                                <TableCell align="center">Title</TableCell>
                                <TableCell align="center" colSpan={2}>Action</TableCell>                    
                            </TableRow>
                            </TableHead>
                            <TableBody>
                                {category}
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


export default  withStyles(styles, {withThemes: true})(ViewCategory)


 /* <div key={index} onDoubleClick={() =>{if(window.confirm('Delete the item?')) {this.handleDelete(list._id)};}} className="gallery-card">
                    <div className="gallery-image">
                        <img src={list.imagelink} alt={list.title+" edgav"}/>
                    </div>
                </div> */