import React, { Component } from 'react';
import logo from '../../telkomsel.png';
import Modal from 'react-modal';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';

export default class HeaderComponent extends Component {
	render() {
		var myStyle = {
		fontSize: 15,
		color: 'white',
		background: 'red'
		}	
		var style = {
        backgroundImage: "url(" + logo + ")",
        backgroundSize: "contain",
        width: "5%",
        height: "5%",
        backgroundPosition: "center",
        display: "inline-block",
        backgroundRepeat: "no-repeat"
      	}
		return (
	      <div className="header">
	      	{/* 
	      <a href="/" className="logo-a"><span style={style}></span></a>
	  		*/}
	        <header className="App-header">
	        	<img src={logo} className="web-logo" alt="logo" style={style}/>
	        	<div className="header-links">
			    <a  href="/search">Search</a>
			    {/*
			    <a onClick={this.openModal} >Login</a>
			    */}
			    <a href="/act">Activity</a>				
			    </div>
	          	<h1 className="App-title" style = {myStyle} >NS Karawang Data Center</h1>
	        </header>
	        {/*
	        <BootstrapTable data={ this.state.acts }>
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