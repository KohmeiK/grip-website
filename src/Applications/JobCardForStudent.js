import React, { useState, useEffect } from "react"
import { Card, Row, Col } from 'react-bootstrap'

function JobCardForStudent(props) {

  //   const imageURL = "https://picsum.photos/" + (800 + props.index) +"/100"
  //   just to randomize image

  const [status, setStatus] = useState('Pending')

  useEffect(() => {
    if (props.downloaded) {
      setStatus('Downloaded by company on ' + props.downloaded)
    }
  }, [])

  return (
    <>
      <Card>
        <Card.Body>
          <Row>
            <Col sm={3}>
              <img src={props.companyLogoURL} width="150"></img>
            </Col>
            <Col sm={9}>
              <Card.Title>{props.title}</Card.Title>
              <Card.Text style={{ wordWrap: "breakWord" }}>
                {props.companyName} ({props.location}) <br />
                Status: {status} <br />
                Applied {props.applyDate} — Application closed {props.dl}
              </Card.Text>
            </Col>
          </Row>
        </Card.Body>
      </Card>
      <br />
    </>
  )
}

export default JobCardForStudent
