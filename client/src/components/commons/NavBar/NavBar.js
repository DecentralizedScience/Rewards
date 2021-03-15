import React, { Component } from 'react'
import { Menu, Segment, Image } from 'semantic-ui-react'
import './NavBar.css'
import Identicon from 'identicon.js';
import {Link} from 'react-router-dom';




export default class NavBar extends Component {
  state = { activeItem: 'home' }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render() {
    const { activeItem } = this.state

    return (
      <Segment inverted className="segment-overwrite">
        <Menu inverted secondary>
          <Menu.Item
            name='papers'
            as={Link} to='/'
            active={activeItem === 'papers'}
            onClick={this.handleItemClick}
          />
          <Menu.Item
            name='reviewers'
            as={Link} to='/reviewers'
            active={activeItem === 'reviewers'}
            onClick={this.handleItemClick}
          />
          <Menu.Item
            name='aboutUs'
            as={Link} to='/aboutUs'
            active={activeItem === 'aboutUs'}
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
              content={this.props.account}
              active={activeItem === 'account'}
              onClick={this.handleItemClick}
            />   
          </Menu.Menu>
        </Menu>   
      </Segment>
    )
  }
}
