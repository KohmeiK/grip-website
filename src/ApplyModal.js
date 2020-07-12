import React, {useState} from "react"
import {Modal, Button, Container, Row, Col} from 'react-bootstrap'
import { Document, Page } from 'react-pdf';
import Resume from './Resume.js'

function ApplyModal(props) {

  const handleConfirm = () => {
    alert(props.uid + " is appying to " + props.cid)
    //Write to DB Here

    //Close Modal
    props.handleClose()
  }

  return (
    <>
      <Modal show={props.show} onHide={props.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Apply</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <b>Uid: {props.uid}</b>
        <br />
        is about to apply to
        <br />
        <b>CompanyUser: {props.cid}</b>
        <br />
        The follow resume will be uploaded:
        <br />
        <Container fluid>
          <Row className="justify-content-md-center">
            <Col style={{borderStyle: "solid"}} md="auto">
              <Resume />
            </Col>
          </Row>

        </Container>
        <br />
        {/*<p>[Debug] Index:{props.index} Show:{props.show ? "isTrue" : "isFalse"} </p>*/}

        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={props.handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleConfirm}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ApplyModal
