import React from 'react'
import { Button, Card, Image } from 'semantic-ui-react'

const CardExampleGroups = () => (
  <Card.Group>
    <Card>
      <Card.Content>
        <Image
          floated='right'
          size='mini'
          src='/steve.jpg'
        />
        <Card.Header>Steve Sanders</Card.Header>
        <Card.Description>
          Steve's paper
            </Card.Description>
      </Card.Content>
      <Card.Content extra>
        <div className='ui two buttons'>
          <Button basic color='green'>
            Say thank you
          </Button>
        </div>
      </Card.Content>
    </Card>
  </Card.Group>
);

export default CardExampleGroups