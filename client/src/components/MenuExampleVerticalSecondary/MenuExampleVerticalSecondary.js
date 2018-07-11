import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Input, Menu } from 'semantic-ui-react'

export default class MenuExampleVerticalSecondary extends Component {
	state = { activeItem: 'home' }

	handleItemClick = (e, { name }) => this.setState({ activeItem: name })

	render() {
    	const { activeItem } = this.state

    	return (
    		<Menu pointing secondary>
            <link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.3.2/semantic.min.css"></link>
    		<Menu.Menu position='left'>
            </Menu.Menu>
                <Menu.Item as={Link} to="/"
                    name='Home'
                    active={activeItem === 'Home2'}
                    onClick={this.handleItemClick}
                />
                <Menu.Item as={Link} to="/site"
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
            <Menu.Item>
              <Input
                transparent
                icon={{ name: 'search', link: true }}
                placeholder='Search Site...'
              />
            </Menu.Item>
            </Menu>

            
    	)
  	}
}