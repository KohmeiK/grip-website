import React from "react"
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import Image from './Image'
import ApplyModal from "./ApplyModal.js"

function CompanyContainer(props){

  const imageURL = "https://picsum.photos/" + (800 + props.index) +"/100"
  //just to randomize image

  const handleClick = () => props.handleShow(props.index)

  return(
    <>
      <Card>
        <Card.Img variant="top" src={imageURL} style={{height:"7em"}} />
        <Card.Body>
          <Card.Title>{props.name}</Card.Title>
          <Card.Text>
            <pre>
              {props.info}
            </pre>
          </Card.Text>
        </Card.Body>
        <Card.Footer>
          <Button onClick={handleClick}> Apply! </Button>
        </Card.Footer>
      </Card>
      <ApplyModal
        uid={props.uid}
        cid={props.cid}
        key={props.index}
        index= {props.index}
        handleClose={props.handleClose}
        handleShow={props.handleShow}
        show={props.show}
      />
    </>
  )
}

export default CompanyContainer

//This is for Image Placeholder before loading is done
// <img src="%PUBLIC_URL%/TempImg.png"/>
// <Image src={imageURL}/>
