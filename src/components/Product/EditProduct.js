import React, { Component } from 'react'
import { withStyles } from "@material-ui/core/styles";
import { Typography, Button, CircularProgress } from "@material-ui/core";
import CloudUploadIcon from "@material-ui/icons/CloudUploadRounded";
import PhotoLibraryIcon from '@material-ui/icons/PhotoLibrary';
import firebase from "../../config/firebase";
import AddIcon from '@material-ui/icons/Add';
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';

import "./CreateProduct.css"

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
  
    const token = localStorage.getItem('token');

class EditProduct extends Component {
    constructor(props){
        super(props);
        this.state = {
            thumblink:null,
            imageurl: null,
            categoryid:null,  
            title:null,
            sku:null,
            subcategoryid:null,
            costprice:null,
            sellingprice:null,
            description:null,
            isLoading:false,
            selected:false,
            categories:[],
            subcategories:[]
        }
    }


    componentDidMount(){
        fetch('https://server.dholpurshare.com/admin/product/' + this.props.match.params._id,{
            method:'GET',
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
                title:response.data.title,
                sku:response.data.sku,
                costprice:response.data.costprice,
                sellingprice:response.data.sellingprice,
                description:response.data.description,
                isLoading:false
            }) 
        })
        .catch(err => {
          this.setState({
            isLoading:false
          })
        })
    }

    fileChangeHandler = (event) => {
        console.log(event.target.files[0]);
        this.setState({
            thumblink: URL.createObjectURL(event.target.files[0]),
            selected : true
        })
    }


    firebaseupload=async()=>{
        this.setState({isLoading : true})
        const response = await fetch(this.state.thumblink)
        const blob = await response.blob()
        var ref = firebase.storage().ref().child('thumbnail/' + this.state.thumblink)
        return ref.put(blob)
        .then(()=>{
            ref.getDownloadURL().then((url)=>{
                console.log(url)
                this.setState({
                    imageurl : url
                })
                fetch('https://server.dholpurshare.com/admin/product', {
                    method: "POST",
                    headers: {
                        "Accept": "application/json",
                        "Content-Type": "application/json",
                        Authorization:'Bearer '+this.props.token
                    },
                    body: JSON.stringify(this.state)
                }).then(result => {
                    result.json().then(response => {
                        
                        this.setState({
                            isLoading: false
                        })
                        alert('Product Added Successfully')
                        window.location.reload(false);
                       
                    })
                }).catch(err => {
                    alert("Something went wrong")
                    this.setState({
                        loading: false,
                        error: err
                    });
                });  
            })
        })
    }


    handleUpdate = (id) => {
        fetch('https://server.dholpurshare.com/admin/product', {
            method: "PUT",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                Authorization:'Bearer '+this.props.token
            },
            body: JSON.stringify(this.state)
        }).then(result => {
            result.json().then(response => {
                
                this.setState({
                    isLoading: false
                })
                alert('Product Updated Successfully')
                window.location.reload(false);
                
            })
        }).catch(err => {
            alert("Something went wrong")
            this.setState({
                loading: false,
                error: err
            });
        });  
    }


    render() {

        const category  = this.state.categories.map((item, index) => {
            return <option value={item._id}>{item.category}</option>
        })

        const subcategory  = this.state.subcategories.map((item, index) => {
            return <option value={item._id}>{item.subcategory}</option>
        })

        return (
            <div>
                <div>
                    <div style={{background:'rgb(50, 70, 246)', padding:'0.8rem'}}>
                    
                        <Typography style={{color:'white'}}>
                            {this.state.title}
                        </Typography>

                    </div>
                    
                    <div className="container">
                        <div className="table-container">
                            <table>
                        
                                 

                                  <tr>
                                      <td>Change Title</td>
                                      <td><input type="text" placeholder="Product Title" value={this.state.title} onChange={(event)=>{this.setState({title:event.target.value})}}/></td>
                                  </tr>

                                  <tr>
                                      <td>Product SKU</td>
                                      <td><input disabled type="text" placeholder="Product SKU" value={this.state.sku} onChange={(event)=>{this.setState({sku:event.target.value})}}/></td>
                                  </tr>


                                  <tr>
                                      <td>Change Costprice</td>
                                      <td><input type="number" placeholder="Product Cost Price" value={this.state.costprice} onChange={(event)=>{this.setState({costprice:event.target.value})}}/></td>
                                  </tr>

                                  <tr>
                                      <td>Change Sellingprice</td>
                                      <td><input type="number" placeholder="Product Selling Price" value={this.state.sellingprice} onChange={(event)=>{this.setState({sellingprice:event.target.value})}}/></td>
                                  </tr>

                                  <tr>
                                      <td>Product Details</td>
                                      <td><textarea placeholder="Product Description" value={this.state.description} onChange={(event)=>{this.setState({description:event.target.value})}}/></td>
                                  </tr>

                                  <tr style={{marginTop:'20px'}}>
                                      <td></td>
                                      <td >
                                          {
                                              this.state.isLoading ?
                                              <button style={{background:'white', color:'blue', border:'0'}} startIcon={<CircularProgress/>} color="primary" >Updating... </button>
                                              :
                                              <button style={{background:'blue', color:'white'}} startIcon={<CloudUploadIcon  />} color="primary" onClick={this.handleUpdate}>Update Now</button>
                                          }
                                      </td>
                                  </tr>
                            </table>
                        </div>
                        
                            
                            
                    </div>
                </div>
            </div>
        )
    }
}


export default  withStyles(styles, {withThemes: true})(EditProduct);

