import React, { Component } from 'react'
import { Form } from 'semantic-ui-react'

class FormCreate extends Component {
  state = {}

  handleChange = (e, { name, value }) => this.setState({ [name]: value })

  handleSubmit = () => {
    this.props.createPaper(this.state.name)
    this.setState({ name: '' })
  }

  render() {
    const { name } = this.state

    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.Group>
          <Form.Input
            placeholder='Title of the new paper'
            name='name'
            value={name}
            onChange={this.handleChange}
          />
          <Form.Button content='Create' />
        </Form.Group>
      </Form>
    )
  }
}

export default FormCreate
