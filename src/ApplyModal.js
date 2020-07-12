import React, {useState} from "react"
import {Modal, Button} from 'react-bootstrap'

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
        <p>[Debug] Index:{props.index} Show:{props.show ? "isTrue" : "isFalse"} </p>

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
