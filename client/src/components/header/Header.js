import React from 'react'
import { Link } from 'react-router-dom'
import { Input, Menu, Segment } from 'semantic-ui-react'

class Header extends React.Component {
render() {
	return (
  		<header>
		    <nav>
		      <ul>
		        <li><Link to='/'>Home</Link></li>
		        <li><Link to='/'>Site</Link></li>
		        <li><Link to='/'>Battery</Link></li>
		        <li><Link to='/'>Rectifier</Link></li>
		        <li><Link to='/'>EAS</Link></li>
		        <li><Link to='/'>Transport</Link></li>
		        <li><Link to='/'>Revenue</Link></li>
		        <li><Link to='/'>System</Link></li>
		        <li><Link to='/'>Genset</Link></li>
		        <li><Link to='/activity'>Activity</Link></li>
		      </ul>
		    </nav>
  		</header>
	)
	}
}
export default Header