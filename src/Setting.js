import React from 'react'
import FirebaseContext from './Firebase'
import AuthContext from './Firebase/AuthContext'
import {CardColumns, Form, InputGroup, FormControl, Row, Col, Container} from 'react-bootstrap'

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
        <Form>
          <Form.Row className="align-items-center">
            <Col>
              <Form.Label htmlFor="inlineFormInputGroup" srOnly>
                Some Eventual Search Feature Could Go Here
              </Form.Label>
              <InputGroup className="mb-2">
                <FormControl id="inlineFormInputGroup" placeholder="Some Eventual Search Feature Could Go Here" />
                <InputGroup.Append>
                  <InputGroup.Text>Search</InputGroup.Text>
                </InputGroup.Append>
              </InputGroup>
            </Col>
          </Form.Row>
        </Form>
            Nothing
        </Col>
        <Col sm={3}>More Settings</Col>
      </Row>
    </Container>
    </div>
  )
}

export default Setting
