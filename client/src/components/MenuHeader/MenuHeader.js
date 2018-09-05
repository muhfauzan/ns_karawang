import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Input, Menu } from 'semantic-ui-react'

export default class MenuHeader extends Component {
	state = { 
        activeItem: 'home',
        searchString: ""
    }


	handleItemClick = (e, { name }) => this.setState({ activeItem: name })

	render() {
    	const { activeItem, searchString } = this.state

    	return (
    		<Menu pointing secondary>
            <link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.3.2/semantic.min.css"></link>
    		<Menu.Menu position='left'>
            </Menu.Menu>
                <Menu.Item as={Link} to="/"
                    name='Home'
                    active={activeItem === 'Home'}
                    onClick={this.handleItemClick}
                />
                <Menu.Item as={Link} to="/site_pagination"
                    name='Site'
                    active={activeItem === 'Site'}
                    onClick={this.handleItemClick}
                />
                <Menu.Item as={Link} to="/battery"
                    name='Battery'
                    active={activeItem === 'Battery'}
                    onClick={this.handleItemClick}
                />
                <Menu.Item as={Link} to="/rectifier"
                    name='Rectifier'
                    active={activeItem === 'Rectifier'}
                    onClick={this.handleItemClick}
                />
                <Menu.Item as={Link} to="/eas"
                    name='EAS'
                    active={activeItem === 'EAS'}
                    onClick={this.handleItemClick}
                />
                <Menu.Item as={Link} to="/transport"
                    name='Transport'
                    active={activeItem === 'Transport'}
                    onClick={this.handleItemClick}
                />
                <Menu.Item as={Link} to="/revenue"
                    name='Revenue'
                    active={activeItem === 'Revenue'}
                    onClick={this.handleItemClick}
                />
                <Menu.Item as={Link} to="/system"
                    name='System'
                    active={activeItem === 'System'}
                    onClick={this.handleItemClick}
                />
                <Menu.Item as={Link} to="/genset"
                    name='Genset'
                    active={activeItem === 'Genset'}
                    onClick={this.handleItemClick}
                />
                <Menu.Item as={Link} to="/activity"
                    name='Activity'
                    active={activeItem === 'Activity'}
                    onClick={this.handleItemClick}
                />
                {/*
                <Menu.Item>
                    <Input 
                        icon='search' placeholder='Search...' 
                    />
                </Menu.Item>
                */}
            </Menu>

            
    	)
  	}
}