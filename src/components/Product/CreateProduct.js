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
  

class CreateProduct extends Component {
    constructor(){
        super();
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
        fetch('https://api.dholpurshare.com/admin/category',{
            method:'GET',
            headers:{
                "Accept": "application/json",
                "Content-Type": "application/json",
                Authorization:'Bearer '+this.props.token
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
                categories:response.data,
                isLoading:false
            }) 
        })
        .catch(err => {
          this.setState({
            isLoading:false
          })
        })


        fetch('https://api.dholpurshare.com/admin/subcategory',{
            method:'GET',
            headers:{
                "Accept": "application/json",
                "Content-Type": "application/json",
                Authorization:'Bearer '+this.props.token
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
                subcategories:response.data,
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
                fetch('https://api.dholpurshare.com/admin/product', {
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
                            Create Gallery
                        </Typography>

                    </div>

                    <div className="container">
                        <div className="table-container">
                            <table>
                        
                                  <tr>
                                      <td>Select Category</td>
                                      <td>
                                          <select color="primary" variant="outlined"  onChange={(event)=>{this.setState({categoryid:event.target.value})}}>
                                          <option disabled selected>Select Category</option>
                                                {category}
                                          </select>
                                    </td>
                                  </tr>
                                
                                  <tr>
                                      <td>Select Subcategory</td>
                                      <td>
                                          <select color="primary" variant="outlined"  onChange={(event)=>{this.setState({subcategoryid:event.target.value})}}>
                                          <option disabled selected>Select Subcategory</option>
                                                {subcategory}
                                          </select>
                                    </td>
                                  </tr>
                                 

                                  <tr>
                                      <td>Choose Image</td>
                                      <td>
                                    <input type="file" style={{display:'none'}} onChange={this.fileChangeHandler} ref={chooseFile => this.chooseFile = chooseFile} accept="image/*"/>
                                    {
                                        this.state.selected ?
                                        <img src={this.state.thumblink} style={{maxHeight:'200px',maxWidth:'300px',  margin:'1rem 0'}} />
                                        :
                                    
                                        <Button variant="outlined" color="primary" style={{height:'150px',width:'150px', border:'2px dotted rgb(177, 174, 174)'}} startIcon={<AddAPhotoIcon/>} size="large" onClick={() => this.chooseFile.click()}>
                                            {/* <span>Choose Image</span> */}
                                        </Button>

                                    }
                                    </td>
                                  </tr>

                                  <tr>
                                      <td>Enter Title</td>
                                      <td><input type="text" placeholder="Product Title" onChange={(event)=>{this.setState({title:event.target.value})}}/></td>
                                  </tr>

                                  <tr>
                                      <td>Enter SKU</td>
                                      <td><input type="text" placeholder="Product SKU" onChange={(event)=>{this.setState({sku:event.target.value})}}/></td>
                                  </tr>


                                  <tr>
                                      <td>Enter Costprice</td>
                                      <td><input type="number" placeholder="Product Cost Price" onChange={(event)=>{this.setState({costprice:event.target.value})}}/></td>
                                  </tr>

                                  <tr>
                                      <td>Enter Sellingprice</td>
                                      <td><input type="number" placeholder="Product Selling Price" onChange={(event)=>{this.setState({sellingprice:event.target.value})}}/></td>
                                  </tr>

                                  <tr>
                                      <td>Product Details</td>
                                      <td><textarea placeholder="Product Description" onChange={(event)=>{this.setState({description:event.target.value})}}/></td>
                                  </tr>

                                  <tr style={{marginTop:'20px'}}>
                                      <td></td>
                                      <td >
                                          {
                                              this.state.isLoading ?
                                              <button style={{background:'white', color:'blue', border:'0'}} startIcon={<CircularProgress/>} color="primary" >Loading... </button>
                                              :
                                              <button style={{background:'blue', color:'white'}} startIcon={<CloudUploadIcon  />} color="primary" onClick={this.firebaseupload}>Upload Now</button>
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


export default  withStyles(styles, {withThemes: true})(CreateProduct)

