import React from "react"
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import Image from './Image'
import ApplyModal from "./ApplyModal.js"

function JobCard(props){

//   const imageURL = "https://picsum.photos/" + (800 + props.index) +"/100"
//   just to randomize image

  const handleClick = () => props.handleClick(props.index)

  return(
    <>
      <Card>
        {/* <Card.Img variant="top" src={imageURL} style={{height:"7em"}} /> */}
        <Card.Body>
          <Card.Title>{props.title}</Card.Title>
          <Card.Text>
            <pre>
              Deadline: {props.dl} <br/>
              Number of Applicants: {props.applicantNum}
            </pre>
          </Card.Text>
        </Card.Body>
        <Card.Footer>
          <Button onClick={handleClick}> Download all resumes </Button>
        </Card.Footer>
      </Card>
      {/*Normally Hidden*/}
      
    </>
  )
}

export default JobCard

//This is for Image Placeholder before loading is done
// <img src="%PUBLIC_URL%/TempImg.png"/>
// <Image src={imageURL}/>
