import React, { useState } from "react"
import { Modal, Button, Container, Row, Col } from 'react-bootstrap'
import { Document, Page } from 'react-pdf';
import Resume from './Resume.js'
import { Formik, Field, Form } from 'formik';
import Thumbnail from "./Thumbnail.js"


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
          <b>User: {props.studentName} &nbsp;</b> {/*nbsp is to force space*/}
        is about to apply to
        <br />
          <b>Internship: {props.jobTitle} at {props.companyName}</b>
          <br />
        The follow resume will be uploaded:
        <br />
          <Container fluid>
            <Row className="justify-content-md-center">
              <Col style={{ borderStyle: "solid" }} md="auto">
                <Resume />
              </Col>
            </Row>

          </Container>
          <br />
          {/*<p>[Debug] Index:{props.index} Show:{props.show ? "isTrue" : "isFalse"} </p>*/}

          <div>
            <Formik
              enableReinitialize={true}
              initialValues={{}}
              onSubmit={async values => {
                // handleShow()
                // console.log("Vals", values)
                // setFinalFormVals(values)
              }}
            >
              {({ values, handleChange, setFieldValue }) => (
                <Form>
                  <div id="my-radio-group">Upload Your Resume</div>

                  <div role="group" aria-labelledby="my-radio-group">
                    <label>
                      <Field type="radio" name="resume" onChange={e => {
                        handleChange(e)
                        console.log('hi')
                      }} />
                      Upload a New Resume
                      <div className="form-group">
                        <input name="file" type="file" onChange={(event) => {
                          setFieldValue("file", event.currentTarget.files[0]);
                        }} className="form-control" />
                        <Thumbnail file={values.file} />
                      </div>
                    </label> <br />
                    <label>
                      <Field type="radio" name="resume" />
                      Upload Your Existing Resume
                    </label><br />
                  </div>

                  {/* <Button disabled={!authContext.authenticated} type="submit">Update Info</Button> */}
                </Form>
              )}
            </Formik>
          </div>

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
