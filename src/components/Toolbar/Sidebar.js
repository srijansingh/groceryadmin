import React, { Component } from 'react'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import { withStyles } from '@material-ui/core/styles';
import LabelIcon from '@material-ui/icons/Label';
import FaceIcon from '@material-ui/icons/Face';
import CategoryIcon from '@material-ui/icons/Category';
import BrandingWatermarkOutlinedIcon from '@material-ui/icons/BrandingWatermarkOutlined';
import DashboardIcon from '@material-ui/icons/Dashboard';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import ToysIcon from '@material-ui/icons/Toys';
import AssignmentTurnedInSharpIcon from '@material-ui/icons/AssignmentTurnedInSharp';
import AddIcon from '@material-ui/icons/Add';
import VisibilityIcon from '@material-ui/icons/Visibility';

import "./Sidebar.css"
import { Divider } from '@material-ui/core';

function ListItemLink(props) {
    return <ListItem button component="a" {...props} />;
}

function NestedListItemLink(props) {
    return <ListItem button component="a" {...props} />;
}


const styles = (theme) => ({
    nested: {
      paddingLeft: theme.spacing(4),
    },
  });

  class Sidebar extends Component {
    constructor(){
        super();
        this.state={
            open:false,
            category:false,
            order:false
        }
    }

    handleCategory = () => {
        this.setState({
            category:!this.state.category
        })
    }
    handleOrder = () => {
        this.setState({
            order:!this.state.order
        })
    }

    handleClick = () => {
        this.setState({
            open:!this.state.open
        })
    }
    render() {

        const {classes} = this.props;

        return (

            <div className="sidebar">
                <List>
                    <ListItemLink key="0"  href="/">
                            <ListItemIcon><DashboardIcon style={{color:"blue"}}/></ListItemIcon>
                            <ListItemText primary="Dashboard" />
                    </ListItemLink>

                   

                   
                    <ListItemLink key="5" href="/customers">
                            <ListItemIcon><FaceIcon style={{color:"blue"}} /></ListItemIcon>
                            <ListItemText primary="Customers" />
                    </ListItemLink>

                    <Divider />

                    <ListItem button onClick={this.handleOrder}>
                        <ListItemIcon >
                        <CategoryIcon style={{color:"blue"}}/>
                        </ListItemIcon>
                        <ListItemText primary="Order" />
                        {this.state.order ? <ExpandLess /> : <ExpandMore />}
                    </ListItem>
                    <Collapse in={this.state.order} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>

                        <NestedListItemLink key="7" className={classes.nested} href="/order">
                            <ListItemIcon>
                                <VisibilityIcon style={{color:"black"}}/>
                                </ListItemIcon>
                                <ListItemText primary="All Orders" />
                        </NestedListItemLink>

                        <NestedListItemLink key="7" className={classes.nested} href="/processing">
                            <ListItemIcon>
                                <VisibilityIcon style={{color:"black"}}/>
                                </ListItemIcon>
                                <ListItemText primary="Processing" />
                        </NestedListItemLink>

                        <NestedListItemLink key="7" className={classes.nested} href="/delivered">
                            <ListItemIcon>
                                <VisibilityIcon style={{color:"black"}}/>
                                </ListItemIcon>
                                <ListItemText primary="Delivered" />
                        </NestedListItemLink>

                        <NestedListItemLink key="7" className={classes.nested} href="/shipped">
                            <ListItemIcon>
                                <VisibilityIcon style={{color:"black"}}/>
                                </ListItemIcon>
                                <ListItemText primary="Shipped" />
                        </NestedListItemLink>

                        

                        
                        </List>
                    </Collapse>

                    <Divider />

                    <ListItem button onClick={this.handleCategory}>
                        <ListItemIcon >
                        <CategoryIcon style={{color:"blue"}}/>
                        </ListItemIcon>
                        <ListItemText primary="Category" />
                        {this.state.category ? <ExpandLess /> : <ExpandMore />}
                    </ListItem>
                    <Collapse in={this.state.category} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>

                       
                       
                        
                        <NestedListItemLink key="7" className={classes.nested} href="/create-category">
                            <ListItemIcon>
                                <AddIcon style={{color:"black"}}/>
                                </ListItemIcon>
                                <ListItemText primary="Create Category" />
                        </NestedListItemLink>

                        <NestedListItemLink key="7" className={classes.nested} href="/view-category">
                            <ListItemIcon>
                                <VisibilityIcon style={{color:"black"}}/>
                                </ListItemIcon>
                                <ListItemText primary="View Category" />
                        </NestedListItemLink>

                        <NestedListItemLink key="7" className={classes.nested} href="/create-subcategory">
                            <ListItemIcon>
                                <AddIcon style={{color:"black"}}/>
                                </ListItemIcon>
                                <ListItemText primary="Create Subcategory" />
                        </NestedListItemLink>

                        <NestedListItemLink key="7" className={classes.nested} href="/view-subcategory">
                            <ListItemIcon>
                                <VisibilityIcon style={{color:"black"}}/>
                                </ListItemIcon>
                                <ListItemText primary="View Subcategory" />
                        </NestedListItemLink>

                        <NestedListItemLink key="7" className={classes.nested} href="/create-brand">
                            <ListItemIcon>
                                <AddIcon style={{color:"black"}}/>
                                </ListItemIcon>
                                <ListItemText primary="Create Brand" />
                        </NestedListItemLink>

                        <NestedListItemLink key="7" className={classes.nested} href="/view-brand">
                            <ListItemIcon>
                                <VisibilityIcon style={{color:"black"}}/>
                                </ListItemIcon>
                                <ListItemText primary="View Brand" />
                        </NestedListItemLink>

                        
                        </List>
                    </Collapse>
                    
                    <Divider />

                    

                    <ListItem button onClick={this.handleClick}>
                        <ListItemIcon >
                        <ToysIcon style={{color:"blue"}}/>
                        </ListItemIcon>
                        <ListItemText primary="Product" />
                        {this.state.open ? <ExpandLess /> : <ExpandMore />}
                    </ListItem>
                    <Collapse in={this.state.open} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>

                       
                       
                        
                        <NestedListItemLink key="7" className={classes.nested} href="/create-product">
                            <ListItemIcon>
                                <AddIcon style={{color:"black"}}/>
                                </ListItemIcon>
                                <ListItemText primary="Create Product" />
                        </NestedListItemLink>

                        <NestedListItemLink key="7" className={classes.nested} href="/view-product">
                            <ListItemIcon>
                                <VisibilityIcon style={{color:"black"}}/>
                                </ListItemIcon>
                                <ListItemText primary="View Product" />
                        </NestedListItemLink>

                        

                        
                        </List>
                    </Collapse>

                    <Divider />


                    

                </List>

                <List>
                    <Divider />
                <ListItemLink key="5" onClick={this.props.logout}>
                            <ListItemIcon><ExitToAppIcon style={{color:"blue"}} /></ListItemIcon>
                            <ListItemText primary="Logout" />
                    </ListItemLink>
                </List>
            </div>

        )
    }
}

export default withStyles(styles, {withTheme:true})(Sidebar)