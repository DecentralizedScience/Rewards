import React, { Component } from 'react'
import { Menu, Segment, Image } from 'semantic-ui-react'
import './NavBar.css'
import Identicon from 'identicon.js';




export default class NavBar extends Component {
  state = { activeItem: 'home' }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render() {
    const { activeItem } = this.state

    return (
      <Segment inverted className="segment-overwrite">
        <Menu inverted secondary>
          <Menu.Item
            name='home'
            active={activeItem === 'home'}
            onClick={this.handleItemClick}
          />
          <Menu.Menu position='right'>
          <Menu.Item>
              <Image 
                src={`data:image/png;base64,${new Identicon(this.props.account, 30).toString()}`}
                avatar
              />
          </Menu.Item>
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
