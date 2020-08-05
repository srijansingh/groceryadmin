import React, { Component } from 'react'
import { withStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import "./ViewSubcategory.css";

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
  

class ViewSubategory extends Component {
    constructor(){
        super();
        this.state = {
            isLoading : false,
            subcategory:[]
        }
    }

    componentDidMount(){
        this.setState({
            isLoading:true
        });

        fetch('https://server.dholpurshare.com/admin/subcategory', {
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
                subcategory:response.data,
                isLoading:false
            }) 
        })
        .catch(err => {
            this.setState({
              isLoading:false
            })
        })
                
    }

    handleDelete = (id) => {
        fetch('https://server.dholpurshare.com/admin/subcategory/'+id, {
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
        const subcategory = this.state.subcategory.map((item, index) => {
            return (

               
                <tr  key={index}>
                    <td style={index%2!==0 ? {background:'#f1f1f1'} :{background:'#e6e6e6'}}>{index+1}</td>
                    <td ><img src={item.imageurl} height='60px' /></td>
                    <td>{item.subcategory}</td>
                    <td><DeleteIcon onClick={() =>{if(window.confirm('Delete the item?')) {this.handleDelete(item._id)};}} style={{color:'#000', cursor:'pointer'}} /></td>
                 </tr>
            )
        })
        return (
            <div>
                <div>
                    <div style={{background:'rgb(50, 70, 246)', padding:'0.8rem'}}>
                    
                        <Typography style={{color:'white'}}>
                            View SubCategory
                        </Typography>

                    </div>

                    <div style={{padding:'1rem'}}>
                       <table style={{width:'600px', textAlign:'center'}}>
                           <thead style={{ background:'#f2f2f2', color:'black'}}>
                               <tr>
                                   <th style={{padding:'1rem 0', border:'none'}}>S.No</th>
                                   <th >Preview</th>
                                   <th>Title</th>
                                   <th>Action</th>
                               </tr>
                           </thead>
                           <tbody>
                              {subcategory}
                           </tbody>
                       </table>
                    </div>
                </div>
            </div>
        )
    }
}


export default  withStyles(styles, {withThemes: true})(ViewSubategory)


 /* <div key={index} onDoubleClick={() =>{if(window.confirm('Delete the item?')) {this.handleDelete(list._id)};}} className="gallery-card">
                    <div className="gallery-image">
                        <img src={list.imagelink} alt={list.title+" edgav"}/>
                    </div>
                </div> */