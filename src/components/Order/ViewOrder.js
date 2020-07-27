import React, { Component } from 'react'
import { withStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";
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
  

class ViewOrder extends Component {
    constructor(){
        super();
        this.state = {
            isLoading : false,
            order:[],
            id:null,
            status:null
        }
    }

    componentDidMount(){
        this.setState({
            isLoading:true
        });

        fetch('https://server.dholpurshare.com/admin/order', {
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
                isLoading:false
            }) 
        })
        .catch(err => {
            this.setState({
              isLoading:false
            })
        })
                
    }

   
  
    
    render() {
        const order = this.state.order.map((item, index) => {
            return (

               
                <tr style={index%2!==0 ? {background:'#f1f1f1'} :{background:'#e6e6e6'}}  key={index}>
                <td >{index+1}</td>
                <td>{item.referenceid}</td>
                <td >{item.sku.split(',').map(sku => {
                  return <div><strong>{sku}</strong><br /></div>
                })}</td>
                <td >{item.imageurls.split(',').map((img, index) => {
                  return <img src={img} height='50px' />
                })}</td>
                <td >{item.titles.split(',').map(title => {
                    return <div><strong>{title}</strong><br /></div>
                })}</td>
                <td style={{width:'120px'}}>{item.address}</td>
                <td>{item.mobile}</td>
                <td>
                    {item.status}
                </td>
                <td>
                     <a href={'/order/'+item._id}> View</a>
                </td>
                 </tr>
            )
        })
        return (
            <div>
                <div>
                    <div style={{background:'rgb(50, 70, 246)', padding:'0.8rem'}}>
                    
                        <Typography style={{color:'white'}}>
                            View Category
                        </Typography>

                    </div>

                    <div style={{padding:'1rem'}}>
                       <table style={{width:'100%', textAlign:'center'}}>
                           <thead style={{ background:'#f2f2f2', color:'black'}}>
                               <tr>
                                   <th style={{padding:'1rem 0', border:'none'}}>S.No</th>
                                   <th>Ref. Id</th>
                                   <th>SKU</th>
                                   <th>Preview</th>
                                   <th>Title</th>
                                   <th>Address</th>
                                   <th>Mobile</th>
                                   <th>Status</th>
                                   <th>Action</th>
                               </tr>
                           </thead>
                           <tbody>
                              {order}
                           </tbody>
                       </table>
                    </div>
                </div>
            </div>
        )
    }
}


export default  withStyles(styles, {withThemes: true})(ViewOrder)


 /* <div key={index} onDoubleClick={() =>{if(window.confirm('Delete the item?')) {this.handleDelete(list._id)};}} className="gallery-card">
                    <div className="gallery-image">
                        <img src={list.imagelink} alt={list.title+" edgav"}/>
                    </div>
                </div> */