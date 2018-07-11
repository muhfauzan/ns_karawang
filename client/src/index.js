import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { BrowserRouter } from 'react-router-dom'; // importing from 'react-router'
//import Routes from './routes';
import registerServiceWorker from './registerServiceWorker';
import App from './containers/App'
//import ActivityComponent from './components/activity';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
//import * as ReactBootstrap from 'react-bootstrap';

ReactDOM.render(
	<BrowserRouter>
		{/* <HeaderComponent /> */}
		<App />
		{/* <Routes history={browserHistory} /> */}
	</BrowserRouter>,
	document.getElementById('root')
);

registerServiceWorker();
