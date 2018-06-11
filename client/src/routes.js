// src/routes.js
import React from 'react';
import { Router, Route } from 'react-router';
import App from './components/app';


const Routes = (props) => (
  <Router {...props}>
	<Route server_url="http://localhost:5000" path="/" component={App} />
  </Router>

);
 
export default Routes;