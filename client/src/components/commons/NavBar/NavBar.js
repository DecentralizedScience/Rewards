import React, { Component } from 'react'
import { Menu, Segment } from 'semantic-ui-react'
import './NavBar.css'
import Identicon from 'identicon.js';




export default class NavBar extends Component {
  state = { activeItem: 'home' }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render() {
    const { activeItem } = this.state

    return (
      <Segment inverted class="segment-overwrite">
        <Menu inverted secondary>
          <Menu.Item
            name='home'
            active={activeItem === 'home'}
            onClick={this.handleItemClick}
          />
          <Menu.Menu position='right'>
         
          <img
                className='ml-2'
                width='30'
                height='30'
                src={`data:image/png;base64,${new Identicon(this.props.account, 30).toString()}`}
              />

            <Menu.Item
              name={this.props.account}
              active={activeItem === 'account'}
              onClick={this.handleItemClick}
            />
          </Menu.Menu>
        </Menu>
        
      </Segment>
    )
  }
}
