import React from 'react'
import FirebaseContext from './Firebase'
import {CardColumns, Form, InputGroup, FormControl, Row, Col, Container} from 'react-bootstrap'
import InfoUpdate from "./InfoUpdate"
import OtherSettings from "./OtherSettings"

function Setting(){

  return(
    <div style={{background:"#e0e0e0"}} >
    <Container fluid style={{paddingTop: "2em"}}>
      <Row>
        <Col>
          <div style={{marginLeft: "1em", borderRadius: "25px", background:"white", height: "40em"}}>
            <div style={{margin: "2em", marginTop: "0em",  background:"white", height: "40em"}}>
              Left Empty Intentionally
            </div>
          </div>
        </Col>
        <Col sm={7}>
          <InfoUpdate />
          <OtherSettings />
        </Col>
        <Col sm={3}>More Settings</Col>
      </Row>
    </Container>
    </div>
  )
}

export default Setting
