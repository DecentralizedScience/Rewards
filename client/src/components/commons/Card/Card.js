import React from 'react'
import { Button, Card, Image } from 'semantic-ui-react'

const CardExampleGroups = ({tipPaper, paper}) => (
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
          Steve's paper: {paper.title}
            </Card.Description>
      </Card.Content>
      <Card.Content extra>
        <div className='ui two buttons'>
          <Button basic color='green' name={paper.id} onClick={(event)=>{
            let tipAmount = window.web3.toWei(0.1, 'ether')
            console.log(event.target.name, tipAmount)
            tipPaper(event.target.name, tipAmount)
          }}>
            Send Tip!
          </Button>
          <Button basic color='red'>
            Say Thanks!
          </Button>
        </div>
      </Card.Content>
    </Card>
  </Card.Group>
);

export default CardExampleGroups 