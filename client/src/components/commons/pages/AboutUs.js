import React, { Component } from 'react'
import "./AboutUs.css"
import { Header, Card, Icon, Image } from 'semantic-ui-react'

function AboutUs(){
  return (
    <div>
    <div className='aboutus'>
        <Header as='h2' icon textAlign='center'>
          <Icon name='users' circular />
          <Header.Content>About Us</Header.Content>
        </Header>
     </div>
    <div className='aboutus'>
      
    <Card.Group centered={true} itemsPerRow={3}>
      <Card fluid={1}>
      <Image src='https://media-exp1.licdn.com/dms/image/C4D03AQGMqynU_x2g6w/profile-displayphoto-shrink_800_800/0/1615372878160?e=1620864000&v=beta&t=wrAtZgFYqzCUYZRBSG0UsJG82Ry-WmNTOxhygDyqZ9Y' wrapped ui={false} />
      <Card.Content>
        <Card.Header>Alejandro Alarcón Ayllo</Card.Header>
        <Card.Meta>
          <span className='date'>Joined in 2020</span>
        </Card.Meta>
        <Card.Description>
          Me apasionan los coches, así como todo lo relacionado con el mundo del motor, además 
					de seguir las competiciones de las dos ruedas. Me encanta la tecnología y sobre todo 
					la robótica, tema del que trato de estar siempre al día. 
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
        <a href="mailto:alealarc@ucm.es">
          <Icon name='mail' />
          alealarc@ucm.es
        </a>
      </Card.Content>
    </Card>

    <Card fluid={0}>
      <Image src='https://media-exp1.licdn.com/dms/image/C5603AQEtOvTCxDmB9A/profile-displayphoto-shrink_800_800/0/1564648994824?e=1620864000&v=beta&t=mzCkN7_gXRXa9zy67bNQ4Mmd8zPUPoSLWE_Ic9c_Hrk' wrapped ui={false} />
      <Card.Content>
        <Card.Header>Carlos Rodriguez Hernández</Card.Header>
        <Card.Meta>
          <span className='date'>Joined in 2020</span>
        </Card.Meta>
        <Card.Description>
          Fanático del saxofón y de la música Jazz, en mi tiempo libre me gusta leer algún libro 
					de Shakespeare, de entre todos el que más Hamlet. De mi personalidad destacaría que soy 
					muy activo y comprometido con los proyectos que llevo a cabo.
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
        <a href="mailto:crodri16@ucm.es">
          <Icon name='mail' />
          crodri16@ucm.es
        </a>
      </Card.Content>
    </Card>

    
    <Card fluid={1}>
      <Image src='https://media-exp1.licdn.com/dms/image/C4E03AQFuTB-_rAHqdw/profile-displayphoto-shrink_800_800/0/1587386523628?e=1620864000&v=beta&t=XxB1lCaISPPo9c4xNf84xTWMzzP8qm9RujB9GR18Tq4' rapped ui={false} />
      <Card.Content>
        <Card.Header>Daniel Fidalgo Panera</Card.Header>
        <Card.Meta>
          <span className='date'>Joined in 2020</span>
        </Card.Meta>
        <Card.Description>
          Entre mis aficiones se encuentran la pesca, tocar el piano y la fotografía. En mi tiempo 
					libre me gusta leer libros de filosofía y escuchar música alternativa. Me considero 
					una persona creativa e innovadora que trata de darle siempre un toque personal a todos 
					sus trabajos.
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
        <a href="mailto:dfidalgo@ucm.es">
          <Icon name='mail' />
          dfidalgo@ucm.es
        </a>
      </Card.Content>
    </Card>

    
    <Card fluid={1}>
      <Image src='https://scontent-ort2-1.cdninstagram.com/v/t51.2885-19/106806482_666323870618004_8373231788235910723_n.jpg?_nc_ht=scontent-ort2-1.cdninstagram.com&_nc_ohc=oaKzjvSAohcAX_uPm-6&oh=21b64066953a8acade79a5548f18f978&oe=60757D61' wrapped ui={false} />
      <Card.Content>
        <Card.Header>Fernando Ruiz García</Card.Header>
        <Card.Meta>
          <span className='date'>Joined in 2020</span>
        </Card.Meta>
        <Card.Description>
          Me gustan las cosas sencillas, como los días de lluvia y paraguas. También me apasionan 
					los dinosaurios y todo lo relacionado con el mundo de la paleontología, además de coleccionista 
					de comics. Soy una persona bastante racional y responsable.
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
        <a href="mailto:fernru01@ucm.es">
          <Icon name='mail' />
          fernru01@ucm.es
        </a>
      </Card.Content>
    </Card>

    
    <Card fluid={1}>
      <Image src='https://avatars.githubusercontent.com/u/32678514?s=400&u=b3d9784d9a46164339b6e34be7944e46ecb2062f&v=4' wrapped ui={false} />
      <Card.Content>
        <Card.Header>Pablo Agudo Brun</Card.Header>
        <Card.Meta>
          <span className='date'>Joined in 2020</span>
        </Card.Meta>
        <Card.Description>
          Me gusta estar al día en todo lo relacionado con la cocina, una de mis mayores aficiones. 
					Pero también me gusta la natación, tocar la guitarra y las artes marciales. Me describiría 
					como una persona tranquila, paciente y con un buen sentido del humor.
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
        <a href="mailto:paagudo@ucm.es">
          <Icon name='mail' />
          paagudo@ucm.es
        </a>
      </Card.Content>
    </Card>
</Card.Group>
</div>
</div>
  );
}




export default AboutUs