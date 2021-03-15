import React from "react";
import { Label, Icon, Header, Container, Divider, Grid, Segment, Button, Card, Image } from "semantic-ui-react";
import Identicon from "identicon.js";


const CardExampleGroups = ({match, tipPaper, papers, web3, reviews, reviewCount}) => (
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
      </Grid.Column>
      <Grid.Column>
      <Card.Group>
    {reviews[match.params.id] != null ?  (reviews[match.params.id].map((review, key) => {
      return (
        <Card fluid color="grey" key={key}>
          <Card.Content>
            <Image
              floated="right"
              size="mini"
              src={`data:image/png;base64,${new Identicon(
                review,
                30
              ).toString()}`}
            />
            <Card.Header>Review {key}</Card.Header>
            <Card.Description>
              by {review}
            </Card.Description>
          </Card.Content>
          <Card.Content extra>
            <div className="ui three buttons">
              <Button
                animated='vertical'
                basic color="black"
                name={review}
                onClick={() => {
                  let tipAmount = web3.utils.toWei("0.1", "ether");
                  tipPaper(key, tipAmount, review);
                }}
              >
                <Button.Content hidden>Tip!</Button.Content>
                <Button.Content visible>
                <Icon name='ethereum' />
                </Button.Content>
              </Button>
              <Button animated='vertical' basic color="blue">
                <Button.Content hidden>Say thanks!</Button.Content>
                <Button.Content visible >
                <Icon name='thumbs up' />
                </Button.Content>
              </Button>
              <Button animated='vertical' basic color="orange">
                <Button.Content hidden>Reward</Button.Content>
                <Button.Content visible>
                <Icon name='trophy' />
                </Button.Content>
              </Button>
            </div>
          </Card.Content>
        </Card>
      );
    })):(console.log("No hay revisiones"))}
  </Card.Group>
      </Grid.Column>
    </Grid>

    <Divider vertical><Icon name='arrow right'/></Divider>
  </Segment>
);

export default CardExampleGroups;
