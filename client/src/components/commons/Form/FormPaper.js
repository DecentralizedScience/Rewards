import React, { Component } from 'react'
import { Form } from 'semantic-ui-react'

class FormCreate extends Component {
  constructor(props) {
    super(props)
    this.textInput = React.createRef();
  }

  handleSubmit = e => {
    e.preventDefault();
    const title = this.textInput.current.value;
    this.props.createPaper(title);
  };

  render() {
    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.Group>
        <Form.Field>
          <input
            type="text"
            placeholder='Title of the paper'
            ref={this.textInput}
            required
          />
        </Form.Field>
          <Form.Button content='Add' />
        </Form.Group>
      </Form>
    )
  }
}

export default FormCreate
