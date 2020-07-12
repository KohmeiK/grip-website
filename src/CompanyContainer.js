import React from "react"
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import Image from './Image'

function CompanyContainer(props){

  const imageURL = "https://picsum.photos/" + (200 + props.id) +"/40"
  //just to randomize image
  return(
    <Card>
      <Card.Img variant="top" src={imageURL} style={{height:"5em"}} />
      <Card.Body>
        <Card.Title>{props.name}</Card.Title>
        <Card.Text>
          {props.info}
        </Card.Text>
      </Card.Body>
      <Card.Footer>
        <Button onClick={handleClick}> Apply! </Button>
      </Card.Footer>
    </Card>
  )
}

export default CompanyContainer

//This is for Image Placeholder before loading is done
// <img src="%PUBLIC_URL%/TempImg.png"/>
// <Image src={imageURL}/>

function handleClick(){
  alert("Pushed")
}
