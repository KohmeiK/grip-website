import React from 'react'
import {Container, Row, Col} from "react-bootstrap"

import AdminSettings from "./AdminSettings"

function AdminSettingsContainer(){

  return(
    <div style={{background:"#ba916e"}} >
    <Container fluid style={{paddingTop: "2em", marginTop:"85px"}}>
      <Row>
        <Col>
          <div style={{marginLeft: "1em", borderRadius: "25px", background:"white"}}>
            <div style={{margin: "2em", marginTop: "0em"}}>
            </div>
          </div>
        </Col>
        <Col sm={7}>
            <AdminSettings />
        </Col>
        <Col sm={3}></Col>
      </Row>
    </Container>
    </div>
  )
}


export default AdminSettingsContainer
