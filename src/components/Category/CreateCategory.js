import React, { Component } from 'react'
import { withStyles } from "@material-ui/core/styles";
import { Typography, Button, CircularProgress } from "@material-ui/core";
import CloudUploadIcon from "@material-ui/icons/CloudUploadRounded";
import PhotoLibraryIcon from '@material-ui/icons/PhotoLibrary';
import firebase from "../../config/firebase";
import AddIcon from '@material-ui/icons/Add';
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';
import "./CreateCategory.css"

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
  

class CreateCategory extends Component {
    constructor(){
        super();
        this.state = {
            thumblink:null,
            imagelink: null,
            category:null,  
            title:null,
            isLoading:false,
            selected:false
        }
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
                    imagelink : url
                })
                fetch('https://api.edgiav.com/api/gallery', {
                    method: "POST",
                    headers: {
                        "Accept": "application/json",
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(this.state)
                }).then(result => {
                    result.json().then(response => {
                        
                        this.setState({
                            isLoading: false
                        })
                        alert('Post Added Successfully')
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
                                      <td>Enter Category</td>
                                      <td><input type="text" placeholder="Category" onChange={(event)=>{this.setState({category:event.target.value})}}/></td>
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


export default  withStyles(styles, {withThemes: true})(CreateCategory)

