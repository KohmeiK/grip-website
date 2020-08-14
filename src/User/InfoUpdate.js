import React, { useContext, useEffect, useState } from "react"
import { Formik, Field, Form } from 'formik';
import { Button, Modal, Spinner } from 'react-bootstrap'

import AuthContext from '../Firebase/AuthContext'
import FirebaseContext from '../Firebase'

function InfoUpdate() {
  const authContext = useContext(AuthContext)
  const firebase = useContext(FirebaseContext)
  const [initVals, setInitVals] = useState({
    name: "Loading...",
    year: "Something",
  })
  let valsBuilder = {}

  const [finalFormVals, setFinalFormVals] = useState({})

  const [show, setShow] = useState(false);
  const [password, setPassword] = useState("");
  const [isUpdating, setIsUpdating] = useState(false)

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  async function loadUserFile() {
    const docRef = firebase.db.collection("students").doc(authContext.user.uid);
    try {
      const doc = await docRef.get()
      if (doc.exists) {
        valsBuilder.year = doc.data().classYear
      } else {
        valsBuilder.year = "Error!"
        console.log("No such document!");
      }
      setInitVals(valsBuilder)
    } catch (err) {
      alert(err);
    }
  }

  useEffect(() => {
    if (authContext.isAuthenticated) {
      console.log(authContext.user)
      loadUserFile()
      valsBuilder.name = authContext.user.displayName
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authContext])

  const handleSubmit = (evt) => {
    evt.preventDefault();
    handleUpdateInfo();
    setIsUpdating(true)
  }

  const handleUpdateInfo = async () => {

    const credential = firebase.raw.auth.EmailAuthProvider.credential(
      authContext.user.email,
      password
    );

    try {
      // Now you can use that to reauthenticate
      await authContext.user.reauthenticateWithCredential(credential);

      const docRef = firebase.db.collection("students").doc(authContext.user.uid);
      docRef.set({
        classYear: finalFormVals.year,
        displayName: finalFormVals.name
      })
      await authContext.user.updateProfile({ displayName: finalFormVals.name, })
      alert("Info Updated!")
    } catch (err) {
      alert(err)
    }
    handleClose()
    setIsUpdating(false)
  }


  let arr = []
  let thisYear = new Date().getFullYear()
  for (let i = 0; i <= 10; i++) {
    arr[i] = i + thisYear
  }
  let dropDown = arr.map(item => // create a dropdown list for class year selection (from this year to 10 years later)
    <option value={item}>{item}</option>
  )

  return (
    <div>
      <Formik
        enableReinitialize={true}
        initialValues={initVals}
        onSubmit={async (values, { setSubmitting }) => {
          handleShow()
          console.log("Vals", values)
          setFinalFormVals(values)
        }}
      >
        {({ values, isSubmitting, dirty }) => (
          <Form>
            <label htmlFor="name">Display Name</label>
            <br />
            <Field id="name" name="name" />
            <br />
            <br />
            <div id="my-radio-group">Graduation Year</div>
            <div className="form-group">
              <Field name="year" as="select">
                {dropDown}
              </Field>
            </div>

            <Button disabled={authContext.isLoadingAuthState || !dirty} type="submit">
              {isUpdating && <Spinner
                as="span"
                animation="border"
                size="sm"
                role="status"
                aria-hidden="true"
              />}
          Update Info
          </Button>
          </Form>
        )}
      </Formik>
      <hr />
      <Modal keyboard={false} backdrop={isUpdating ? "static" : "null"} show={show} onHide={handleClose}>
        <form onSubmit={handleSubmit}>
          <Modal.Header>
            <Modal.Title>Enter Your Password to Update Your Info</Modal.Title>
          </Modal.Header>
          <Modal.Body>

            <label>
              Password:
            <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
            </label>
          </Modal.Body>
          <Modal.Footer>
            <Button disabled={isUpdating} variant="secondary" onClick={handleClose}>
              Cancel
          </Button>
            <Button disabled={isUpdating} type="submit" value="Submit" variant="primary">
              {isUpdating && <Spinner
                as="span"
                animation="border"
                size="sm"
                role="status"
                aria-hidden="true"
              />}
            Update Info
          </Button>
          </Modal.Footer>
        </form>
      </Modal>
    </div>
  )
}

export default InfoUpdate
