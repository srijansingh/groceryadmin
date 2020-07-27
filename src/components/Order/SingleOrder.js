import React, { Component } from 'react'
import { withStyles } from "@material-ui/core/styles";
import { Typography, Paper } from "@material-ui/core";
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import AssignmentTurnedInIcon from '@material-ui/icons/AssignmentTurnedIn';
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
  
    const token = localStorage.getItem('token');
class SingleOrder extends Component {
    constructor(){
        super();
        this.state = {
            isLoading : false,
            id:null,
            status:null,
            referenceid:null,
            sku:null,
            titles:null,
            imageurls:null,
            mobile:null,
            addredd:null

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
                status:response.data.status,
                referenceid:response.data.referenceid,
                sku:response.data.sku,
                imageurls:response.data.imageurls,
                titles: response.data.titles,
                mobile:response.data.mobile,
                address:response.data.address,
                id:response.data._id,
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


        return (
            <div>
                <div>
                    <div style={{background:'rgb(50, 70, 246)', padding:'0.8rem'}}>
                    
                        <Typography style={{color:'white'}}>
                            Reference ID : {this.state.referenceid}
                        </Typography>

                        <Typography style={{color:'white'}}>
                            Status : {this.state.status}
                        </Typography>

                    </div>

                    <div style={{padding:'1rem'}}>
                        <Paper elevation={3} style={{width:'700px', textAlign:'center'}}>
                       <table cellSpacing='2' style={{width:'100%', textAlign:'center'}}>
                           
                               <tr >
                                   <th style={{padding:'1rem', background:'#e6e6e6'}}>Ref. Id</th><th style={{padding:'1rem', background:'#f2f2f2'}}>{this.state.referenceid}</th>
                                </tr>
                                <tr>
                                   <th  style={{padding:'1rem', background:'#e6e6e6'}}>SKU</th>
                                   <td style={{padding:'1rem', background:'#f2f2f2'}}>
                                       {this.state.sku}
                                   </td>
                                </tr>
                                
                                <tr>
                                   <th  style={{padding:'1rem', background:'#e6e6e6'}}>Title</th><td style={{padding:'1rem', background:'#f2f2f2'}}>{this.state.titles}</td>
                                </tr>
                                <tr>
                                    <th  style={{padding:'1rem', background:'#e6e6e6'}}>Address</th><td style={{padding:'1rem', background:'#f2f2f2'}}>{this.state.address}</td>
                                </tr>
                                <tr>
                                    <th  style={{padding:'1rem', background:'#e6e6e6'}}>Mobile</th><td style={{padding:'1rem', background:'#f2f2f2'}}>{this.state.mobile}</td>
                                </tr>
                                <tr>
                                   <th  style={{padding:'1rem', background:'#e6e6e6'}}>Status</th>
                                   <td style={{padding:'1rem', background:'#f2f2f2'}}>
                                   {checkStatus}
                                   </td>
                                </tr>
                                <tr>
                                   <th  style={{ background:'#e6e6e6'}}>Action</th>
                                   <td style={{padding:'1rem', background:'#f2f2f2'}}>
                                       
                                    {
                                        this.state.isLoading ? 
                                        <button>Updating..</button>
                                        :
                                        <button onClick={() => {this.handleUpdate(this.state.id)}}>Update</button>
                                    }
                                   </td>
                                </tr>
                               
                           
                       </table>
                       </Paper>
                    </div>
                </div>
            </div>
        )
    }
}


export default  withStyles(styles, {withThemes: true})(SingleOrder)


 /* <div key={index} onDoubleClick={() =>{if(window.confirm('Delete the item?')) {this.handleDelete(list._id)};}} className="gallery-card">
                    <div className="gallery-image">
                        <img src={list.imagelink} alt={list.title+" edgav"}/>
                    </div>
                </div> */