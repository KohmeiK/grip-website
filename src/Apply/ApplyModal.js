import React, {useContext } from "react"
import { Modal, Button } from 'react-bootstrap'
import { Formik, Field, Form } from 'formik';

import FirebaseContext from '../Firebase'

function ApplyModal(props) {
  const firebase = useContext(FirebaseContext)
  console.log(props)

  const handleConfirm = () => {
    alert(props.studentID + " is appying to " + props.jobID)
    //Write to DB Here
    //Can be made a cloud function later
    let studentRef = firebase.db.collection('students').doc(props.studentID)
    studentRef.get().then(function (doc) { // append job's document id to studnet's jobsAppliedTo field
      studentRef.update({ jobsAppliedTo: firebase.raw.firestore.FieldValue.arrayUnion(props.jobID) })
    })
    let jobRef = firebase.db.collection('jobs').doc(props.jobID)
    jobRef.get().then(function (doc) { // append student's id to job's applicants field
      jobRef.update({ applicants: firebase.raw.firestore.FieldValue.arrayUnion(props.studentID) })
    })

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
        {/* The follow resume will be uploaded:
        <br />
          <Container fluid>
            <Row className="justify-content-md-center">
              <Col style={{ borderStyle: "solid" }} md="auto">
                <Resume />
              </Col>
            </Row>

          </Container> */}
          <br />
          {/*<p>[Debug] Index:{props.index} Show:{props.show ? "isTrue" : "isFalse"} </p>*/}

          <div>
            <Formik
              enableReinitialize={true}
              initialValues={{ file: '' }}
              onSubmit={(values) => {
                console.log(props.studentID, '.pdf')
                let resumeRef = firebase.storage.child(props.studentID + props.jobID + '.pdf')
                resumeRef.put(values.file).then(
                  alert('File uploaded')
                )
              }}
            >
              {({ values, handleChange, setFieldValue }) => (
                <Form>
                  <div id="my-radio-group">Upload Your Resume</div>

                  <div role="group" aria-labelledby="my-radio-group">
                    <label>
                      <Field type="radio" name="resume" onChange={e => {
                        handleChange(e)
                      }} />
                      Upload a New Resume
                      <div className="form-group">
                        <input name="file" type="file" onChange={(event) => {
                          setFieldValue("file", event.currentTarget.files[0]);
                        }} className="form-control" />
                      </div>
                    </label> <br />
                    <Button type="submit">Upload</Button> <br />
                    {/* <label>
                      <Field type="radio" name="resume" />
                      Upload Your Existing Resume
                    </label><br /> */}
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
