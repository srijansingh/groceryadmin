import React, {Component} from "react";
import { withStyles } from "@material-ui/core/styles";
import { Typography, Paper } from "@material-ui/core";
import CountComponent from "./component/countComponent";


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
  

class  Dashboard extends Component {
    constructor(){
        super();
        this.state = {
            isLoading: false,
            all:0,
            category:0,
            brand:0,
            active:0,
           order:[]
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
    



       
    render(){

        // const {classes} = this.props;
        const order = this.state.order.map((item, index) => {
            return (

               
                <tr key={index}>
                <td style={index%2!==0 ? {background:'#f1f1f1'} :{background:'#e6e6e6'}}>{index+1}</td>
                <td>{item.referenceid}</td>
                <td >{item.titles.split(',').map(title => {
                    return <div><strong>{title}</strong><br /></div>
                })}</td>
                <td style={{width:'120px', padding:'0.5rem 0'}}>{item.address}</td>
                <td>{item.mobile}</td>
                <td>
                    <select style={{border:'none'}}>
                        <option selected value={item.status}>{item.status}</option>
                        <option disabled>Status</option>
                        <option value='processing'>Processing</option>
                        <option value='confirmed'>Confirm</option>
                        <option value='shipped'>Shipped</option>
                        <option value='delivered'>Delivered</option>

                    </select>
                </td>
                <td><button style={{border:'none', background:'#e6e6e6', color:'black'}} onClick={() => {this.handleUpdate(item._id)}}>Update</button></td>
                 </tr>
            )
        })


        return (
            <div>
            <div style={{background:'rgb(50, 70, 246)', padding:'0.8rem'}}>
               
                <Typography style={{color:'white'}}>
                  Dashboard
               </Typography>

               
                
            </div>
            <div style={{
                
               
                display:'flex',
                flexDirection:'row',
                flexWrap:'wrap',
                padding:'0.5rem',
               
                justifyContent:'space-between'
                }}>
                <CountComponent total={this.state.all} brand={this.state.brand} category={this.state.category} active={this.state.active} />
            </div>
            <div>
                <div style={{padding:'1rem'}}>
            <Paper elevation={3} style={{padding:'1rem'}}>
                <Typography style={{color:'black', fontWeight:'bold', padding:'0.5rem 0'}}>Recent Orders</Typography>
            <table style={{width:'100%', textAlign:'center'}}>
                           <thead style={{ background:'blue', color:'white'}}>
                               <tr>
                                   <th style={{padding:'1rem 0', border:'none'}}>S.No</th>
                                   <th>Ref. Id</th>
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
            </Paper>
            </div>
            </div>
            </div>
        ) 
    }
        
   
}

export default withStyles(styles, {withThemes: true})(Dashboard);