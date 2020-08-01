import React from "react"
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import Image from './Image'
import ApplyModal from "./ApplyModal.js"

function JobCardForStudent(props) {

  //   const imageURL = "https://picsum.photos/" + (800 + props.index) +"/100"
  //   just to randomize image

  const handleClick = () => props.handleClick(props.index)

  return (
    <>
      <Card>
        {/* <Card.Img variant="top" src={imageURL} style={{height:"7em"}} /> */}
        <Card.Body>
          <Card.Title>{props.title}</Card.Title>
          <Card.Text>
            <pre>
              Company: {props.companyName} <br />
              Deadline: {props.dl}
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

export default JobCardForStudent