import React, { Component } from 'react';
import logo from '../../telkomsel.png';
//import { Link } from 'react-router-dom'
//import Modal from 'react-modal';
//import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
//import { Link } from 'react-router-dom'

export default class HeaderLogo extends Component {
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
				<a href="/" className="logo-a"><span style={headerStyle}></span> </a>
				{/*
				<div className="header-links">		
					<Link to='/'>Home</Link>
					<Link to='/search'>Search</Link>
				</div>
				*/}
	      	</div>
    	);
	}
}