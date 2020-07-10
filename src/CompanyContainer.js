import React from "react"
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import Image from './Image'

function CompanyContainer(props){
  const imageURL = "https://picsum.photos/" + (200 + props.id) +"/40"
  //just to randomize image
  return(
    <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src={imageURL} />
      <Card.Body>
        <Card.Title>{props.name}</Card.Title>
        <Card.Text>
          {props.info}
        </Card.Text>
        <Button variant="primary">More Info</Button>
      </Card.Body>
    </Card>
  )
}

export default CompanyContainer

// <img src="%PUBLIC_URL%/TempImg.png"/>
// <Image src={imageURL}/>
