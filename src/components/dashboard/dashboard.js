import React, {Component} from "react";
import { withStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";
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
           
        }
    }

    componentDidMount(){
        

       
                
    }
    



       
    render(){

        // const {classes} = this.props;



        return (
            <div>
            <div style={{background:'rgb(50, 70, 246)', padding:'0.8rem'}}>
               
                <Typography style={{color:'white'}}>
                  Dashboard
               </Typography>

               
                
            </div>
            <div style={{
                height:'95vh',
                overflowY:'scroll',
                overflowX:'hidden',
                display:'flex',
                flexDirection:'row',
                flexWrap:'wrap',
                padding:'0.5rem',
               
                justifyContent:'space-between'
                }}>
                <CountComponent total={this.state.all} brand={this.state.brand} category={this.state.category} active={this.state.active} />
            </div>
            </div>
        ) 
    }
        
   
}

export default withStyles(styles, {withThemes: true})(Dashboard);