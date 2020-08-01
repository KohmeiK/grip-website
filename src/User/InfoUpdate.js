import React, {useContext, useEffect, useState} from "react"
import { Formik, Field, Form } from 'formik';
import { Button, Modal, Spinner} from 'react-bootstrap'
import { useHistory } from "react-router-dom";

import AuthContext from '../Firebase/AuthContext'
import FirebaseContext from '../Firebase'

function InfoUpdate(){
  const authContext = useContext(AuthContext)
  const firebase = useContext(FirebaseContext)
  const history = useHistory()
  const [initVals, setInitVals] = useState({
    name: "Loading...",
    email: "Loading...",
    school: "Loading...",
    year: "Something",
  })
  let valsBuilder = {}

  const [finalFormVals, setFinalFormVals] = useState({})

  const [show, setShow] = useState(false);
  const [password, setPassword] = useState("");
  const [isUpdating, setIsUpdating] = useState(false)

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  async function loadUserFile(){
    const docRef = firebase.db.collection("students").doc(authContext.user.uid);
    try{
      const doc = await docRef.get()
      if (doc.exists) {

          valsBuilder.school = doc.data().school
          valsBuilder.year = doc.data().classYear

      } else {

          valsBuilder.school = "Error!"
          valsBuilder.year = "Error!"
          // doc.data() will be undefined in this case
          console.log("No such document!");
      }
      setInitVals(valsBuilder)
    }catch (err){
      alert(err);
    }
  }

  useEffect(() => {
    if(authContext.isAuthenticated){
      console.log(authContext.user)
      loadUserFile()
      valsBuilder.name = authContext.user.displayName
      valsBuilder.email = authContext.user.email
    }

  },[authContext])

  const handleSubmit = (evt) => {
    evt.preventDefault();
    handleUpdateInfo();
    setIsUpdating(true)
  }

  const handleUpdateInfo = async()=>{

    const credential = firebase.raw.auth.EmailAuthProvider.credential(
        authContext.user.email,
        password
    );
    // Now you can use that to reauthenticate
    await authContext.user.reauthenticateWithCredential(credential);

    const docRef = firebase.db.collection("students").doc(authContext.user.uid);

    try{
      docRef.set({
          school: finalFormVals.school,
          classYear: finalFormVals.year,
      })
      await authContext.user.updateProfile({displayName: finalFormVals.name,})
      await authContext.user.updateEmail(finalFormVals.email)
      handleClose()
      setIsUpdating(false)
      alert("Info Updated!")
    }catch(err){
      alert(err)
    }
  }

  return(
    <div>
      <Formik
        enableReinitialize={true}
        initialValues={initVals}
        onSubmit={async (values, {setSubmitting}) => {
            handleShow()
            console.log("Vals",values)
            setFinalFormVals(values)
        }}
      >
      {({ values, isSubmitting, dirty }) => (
        <Form>
          <label htmlFor="name">Display Name</label>
          <br/ >
          <Field id="name" name="name" />
          <br/ >
          <br/ >
          <label htmlFor="email">Email</label>
          <br/ >
          <Field id="email" name="email" type="email" />
          <br/ >
          <br/ >
          <label htmlFor="school">School</label>
          <br/ >
          <Field id="school" name="school" />
          <br/>
          <br/>
          <div id="my-radio-group">Graduation Year</div>

          <div role="group" aria-labelledby="my-radio-group">
            <label>
              <Field type="radio" name="year" value="2020" />
              2020
            </label> <br/>
            <label>
              <Field type="radio" name="year" value="2021" />
              2021
            </label><br/>
            <label>
              <Field type="radio" name="year" value="2022" />
              2022
            </label><br/>
            <label>
              <Field type="radio" name="year" value="2023" />
              2023
            </label><br/>
            <label>
              <Field type="radio" name="year" value="2024" />
              2024
            </label>
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
      <hr/>
      <Modal keyboard={false} backdrop={isUpdating? "static" : "null"} show={show} onHide={handleClose}>
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
