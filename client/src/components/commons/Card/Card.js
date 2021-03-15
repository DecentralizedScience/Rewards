import React from "react";
import { Label, Icon, Header, Container, Divider, Grid, Segment, Button, Card, Image } from "semantic-ui-react";
import Identicon from "identicon.js";

const CardExampleGroups = ({match, tipPaper, papers, web3 }) => (
  <Segment>
    <Grid columns={2} relaxed='very'>
      <Grid.Column>
      <Container fluid>
      <Header as='h2'>{papers[match.params.id].title}</Header>
      <p>
        Domestic dogs inherited complex behaviors, such as bite inhibition, from
        their wolf ancestors, which would have been pack hunters with complex
        body language. These sophisticated forms of social cognition and
        communication may account for their trainability, playfulness, and
        ability to fit into human households and social situations, and these
        attributes have given dogs a relationship with humans that has enabled
        them to become one of the most successful species on the planet today.
      </p>
      <p>
        The dogs' value to early human hunter-gatherers led to them quickly
        becoming ubiquitous across world cultures. Dogs perform many roles for
        people, such as hunting, herding, pulling loads, protection, assisting
        police and military, companionship, and, more recently, aiding
        handicapped individuals. This impact on human society has given them the
        nickname "man's best friend" in the Western world. In some cultures,
        however, dogs are also a source of meat.
      </p>
    </Container>
    <p>
    <p></p>
      <Label as='a'>
            <Image
              avatar
              spaced='right'
              src={`data:image/png;base64,${new Identicon(
                papers[match.params.id].author,
                30
              ).toString()}`}
            />
        
        {papers[match.params.id].author}
      </Label>
    </p>
      </Grid.Column>
      <Grid.Column>
      <Card.Group>
    {papers.map((paper, key) => {
      return (
        <Card key={key}>
          <Card.Content>
            <Image
              floated="right"
              size="mini"
              src={`data:image/png;base64,${new Identicon(
                paper.author,
                30
              ).toString()}`}
            />
            <Card.Header>{paper.title}</Card.Header>
          </Card.Content>
          <Card.Content extra>
            <div className="ui three buttons">
              <Button
                basic
                color="purple"
                name={paper.id}
                onClick={(event) => {
                  let tipAmount = web3.utils.toWei("0.1", "ether");
                  console.log(event.target.name, tipAmount);
                  tipPaper(event.target.name, tipAmount);
                }}
              >
                Tip!
              </Button>
              <Button basic color="orange">
                Thanks!
              </Button>
              <Button basic color="green">
                Reward
              </Button>
            </div>
          </Card.Content>
        </Card>
      );
    })}
  </Card.Group>
      </Grid.Column>
    </Grid>

    <Divider vertical><Icon name='arrow right'/></Divider>
  </Segment>
);

export default CardExampleGroups;
