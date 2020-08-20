import React, { useContext, useState, useEffect } from "react"
import { Modal, Button, Collapse, Spinner, Card } from 'react-bootstrap'
import { Formik, Field, Form } from 'formik';
import { v4 as uuidv4 } from 'uuid'

import FirebaseContext from '../Firebase'
import AuthContext from '../Firebase/AuthContext'

function ApplyModal(props) {
  const firebase = useContext(FirebaseContext)
  const authContext = useContext(AuthContext)
  const [newSelected, setNewSelected] = useState(true)
  const [openNew, setOpenNew] = useState(true)
  const [openDef, setOpenDef] = useState(false)
  const [defResumeName, setDefResumeName] = useState('')
  const [timeSinceUpload, setTimeSinceUpload] = useState(null)
  const [newResumeUploaded, setNewResumeUploaded] = useState(false)
  const [clUploaded, setClUploaded] = useState(false)
  const [newResumeName, setNewResumeName] = useState()
  const [clName, setClName] = useState('')

  const getDate = () => {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    return mm + '/' + dd + '/' + yyyy
  }

  function timeSince(date) {

    var seconds = Math.floor((new Date() - date) / 1000);

    var interval = seconds / 31536000;

    if (interval > 1) {
      return Math.floor(interval) + " years";
    }
    interval = seconds / 2592000;
    if (interval > 1) {
      return Math.floor(interval) + " months";
    }
    interval = seconds / 86400;
    if (interval > 1) {
      return Math.floor(interval) + " days";
    }
    interval = seconds / 3600;
    if (interval > 1) {
      return Math.floor(interval) + " hours";
    }
    interval = seconds / 60;
    if (interval > 1) {
      return Math.floor(interval) + " minutes";
    }
    return Math.floor(seconds) + " seconds";
  }

  const handleConfirm = () => {
    //Write to DB Here
    //Can be made a cloud function later
    let resumeName
    if (newSelected) { // user has uploaded a new resume
      resumeName = newResumeName
    } else {
      resumeName = props.studentID + '.pdf'
    }

    firebase.db.collection('applications').add({
      studentID: props.studentID,
      jobID: props.jobID,
      title: props.title,
      dl: props.dl,
      location: props.location,
      resumeName: resumeName,
      clName: clName, 
      studentName: props.studentName, 
      applyDate: getDate(),
      downloaded: '',
      companyName: props.companyName,
      companyLogoURL: props.companyLogoURL
    }).then(function (doc) {
      // append aplication's document id to studnet's jobsAppliedTo field
      let studentRef = firebase.db.collection('students').doc(props.studentID)
      studentRef.update({ applications: firebase.raw.firestore.FieldValue.arrayUnion(doc.id) })

      let jobRef = firebase.db.collection('jobs').doc(props.jobID)
      jobRef.update({
        allApplicants: firebase.raw.firestore.FieldValue.increment(1),
        newApplicants: firebase.raw.firestore.FieldValue.increment(1)
      })
    }).then(function () {
      alert("You've applied to this job successfully!")
      props.handleClose() //Close Modal
    }).catch(error => {
      alert(error)
      props.handleClose()
    })

  }

  function CLUploadForm() {
    return (
      <div>
        <Formik
          enableReinitialize={true} x
          initialValues={{ file: '' }}
          onSubmit={(values, { setSubmitting }) => {
            let clNameBuilder = uuidv4() + '.pdf'
            setClName(clNameBuilder)
            let resumeRef = firebase.storage.child(clNameBuilder)
            resumeRef.put(values.file).then(() => {
              setClUploaded(true)
              setSubmitting(false)
              alert('File uploaded')
            }).catch(function (error) {
              setSubmitting(false)
              alert(error)
            })
          }}
        >
          {({ isSubmitting, setFieldValue, dirty }) => (
            <Form>
              <div className="form-group">
                <input name="file" type="file" accept=".pdf" onChange={(event) => {
                  setFieldValue("file", event.currentTarget.files[0]);
                }} className="form-control" />
              </div>
              <button className="my-2 btn btn-primary bg-wb" type="submit" disabled={!dirty || isSubmitting}>
                {isSubmitting && <Spinner
                  as="span"
                  animation="border"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                />}
                  Submit
                </button>
            </Form>
          )}
        </Formik>
      </div>

    )
  }

  function ResumeUploadForm() {
    return (
      <form>
        <input type="radio" id="new"
          aria-expanded={openNew} onChange={() => {
            setOpenNew(true)
            setOpenDef(false)
            setNewSelected(true)
          }} checked={newSelected} />
        <label htmlFor="new">Upload a New Resume</label>
        <Collapse in={openNew}>
          <div>
            <Formik
              enableReinitialize={true} x
              initialValues={{ file: '' }}
              onSubmit={(values, { setSubmitting }) => {
                let newResumeNameBuilder = uuidv4() + '.pdf'
                setNewResumeName(newResumeNameBuilder)
                let resumeRef = firebase.storage.child(newResumeNameBuilder)
                resumeRef.put(values.file).then(() => {
                  setNewResumeUploaded(true)
                  setSubmitting(false)
                  alert('File uploaded')
                }).catch(function (error) {
                  setSubmitting(false)
                  alert(error)
                })
              }}
            >
              {({ isSubmitting, setFieldValue, dirty }) => (
                <Form>
                  <div className="form-group">
                    <input name="file" type="file" accept=".pdf" onChange={(event) => {
                      setFieldValue("file", event.currentTarget.files[0]);
                    }} className="form-control" />
                  </div>
                  <button className="my-2 btn btn-primary bg-wb" type="submit" disabled={!dirty || isSubmitting}>
                    {isSubmitting && <Spinner
                      as="span"
                      animation="border"
                      size="sm"
                      role="status"
                      aria-hidden="true"
                    />}
                      Submit
                    </button>
                </Form>
              )}
            </Formik>
          </div>
        </Collapse>
        <br />
        <input type="radio"
          id="old"
          onChange={() => {
            setOpenNew(false)
            setOpenDef(true)
            setNewSelected(false)
          }} checked={!newSelected} />
        <label htmlFor="old">Upload your default resume</label>
        <Collapse in={openDef}>
          <div>
            {defResumeName
              ? <div><i>{defResumeName}</i>{timeSinceUpload}</div>
              : <i>You haven't uploaded any resume yet!</i>}
          </div>
        </Collapse>
      </form>
    )
  }

  useEffect(() => {
    let uid = authContext.user.uid
    firebase.db.collection('students').doc(uid).get().then(function (doc) {
      if (!doc.data()) return
      if (doc.data().defResumeName) {
        setDefResumeName(doc.data().defResumeName)
      } else {
        return
      }
      let lastUploadTime = doc.data().lastUploadTime
      setTimeSinceUpload(' — uploaded ' + timeSince(lastUploadTime) + ' ago')
    })
  }, [])

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
          <b>Internship: {props.title} at {props.companyName}</b>
          <br />

          {props.reqCoverLetter  // display differently depending on whether a cover letter is required
            ? <div>
                <Card>
                  <Card.Header>
                    Upload a Cover Letter
                </Card.Header>
                  <Card.Body>
                    <CLUploadForm />
                  </Card.Body>
                </Card>
                <Card>
                  <Card.Header>
                    Resume to Apply with
                </Card.Header>
                  <Card.Body>
                    <ResumeUploadForm />
                  </Card.Body>
                </Card>
              </div>
            : <ResumeUploadForm />
          }

        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={props.handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleConfirm} disabled={(newSelected && !newResumeUploaded) || (!newSelected && !defResumeName) || (props.reqCoverLetter && !clUploaded)}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ApplyModal
