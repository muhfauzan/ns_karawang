import React, { Component } from 'react';
import logo from '../../telkomsel.png';
import Modal from 'react-modal';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';

export default class HeaderComponent extends Component {
	render() {
		var headerStyle = {
        backgroundImage: "url(" + logo + ")",
        backgroundSize: "contain",
        width: "100%",
        height: "100%",
        backgroundPosition: "center",
        display: "inline-block",
        backgroundRepeat: "no-repeat"
      	}
		return (
	      <div className="header">	      
	      	<a href="/" className="logo-a"><span style={headerStyle}></span></a>
	      	<div className="header-links">
	      		<a  href="/search">Search</a>
	      		<a onClick={this.openModal} >Login</a>
	      		<a href="/act">Activity</a>
	      	</div>
	        {/*
	        <BootstrapTable data={ this.state.acts.response }>
	          <TableHeaderColumn dataField='site_id' isKey={ true }>Site ID</TableHeaderColumn>
	          <TableHeaderColumn dataField='category'>Category</TableHeaderColumn>
	          <TableHeaderColumn dataField='activity'>Activity</TableHeaderColumn>
	          <TableHeaderColumn dataField='date'>Date</TableHeaderColumn>
	        </BootstrapTable>   
	        */}     
	      </div>
    	);
	}
}