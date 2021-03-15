import React from "react";
import { Card } from "semantic-ui-react";
import {Link} from 'react-router-dom';


const CardExampleGroups = ({ papers }) => (
  <Card.Group>
    {papers.map((paper, key) => {
      return (
        <Card key={key} as={Link} to={`/paper/${key}`}>
          <Card.Content>
            <Card.Header>{paper.title}</Card.Header>
            <Card.Meta>Jose Luis Bernarda</Card.Meta>
            <Card.Description>Elliot is a sound engineer living in Nashville who enjoys playing guitar and hanging with his cat.'</Card.Description>
          </Card.Content>
        </Card>
      );
    })}
  </Card.Group>
);

export default CardExampleGroups;
