import React, {useContext} from 'react'
import { Formik, Field, Form, ErrorMessage } from 'formik';
import FirebaseContext from './Firebase/'
import {Button, Spinner} from "react-bootstrap"
import AuthContext from "./Firebase/AuthContext"

function AdminSettings(){
  const firebase = useContext(FirebaseContext)
  const authContext = useContext(AuthContext)

  const handleBut = async() => {
    if(!authContext.isLoadingAuthState){
      const idTok = await authContext.user.getIdTokenResult()
      console.log("isAdmin",!!idTok.claims.admin)
    }
    return (null)
  }
  return(
    <>
    <Button onClick={handleBut}> Check Admin Status (con.log)</Button>
    <h5>Don't Forget - These changes take effect the next time the user logs in. </h5>
    <Formik
      initialValues={{email: '' }}
      onSubmit={async (values, { setSubmitting }) => {
        try{
          console.log("RequestSent")
          const addAdminRole = firebase.functions.httpsCallable('addAdminRole')
          const result = await addAdminRole({email: values.email})
          console.log(result.data.message, "result.data.message")
          alert(result.data.message)
          setSubmitting(false)
          return(null);
        }catch(error){
          // Getting the Error details.
          // var code = error.code
          // var message = error.message
          // var details = error.details
          console.log(error, "Error")
          alert(error.message)
          return("error");
        }
      }}
    >
    {({isSubmitting, dirty }) => (
      <Form>
        <label htmlFor="email">Email Address</label>
        <Field name="email" type="email" />
        <ErrorMessage name="email" />
        <Button disabled={isSubmitting || !dirty} type="submit">
          {isSubmitting && <Spinner
            as="span"
            animation="border"
            size="sm"
            role="status"
            aria-hidden="true"
          />}
          Make Admin
        </Button>
      </Form>
    )}
    </Formik>
    <Formik
      initialValues={{email: '' }}
      onSubmit={async (values, { setSubmitting }) => {
        try{
          console.log("RequestSent")
          const addAdminRole = firebase.functions.httpsCallable('deleteAdminRole')
          const result = await addAdminRole({email: values.email})
          console.log(result.data.message, "result.data.message")
          alert(result.data.message)
          setSubmitting(false)
          return(null);
        }catch(error){
          // Getting the Error details.
          // var code = error.code
          // var message = error.message
          // var details = error.details
          console.log(error, "Error")
          alert(error.message)
          return("error");
        }
      }}
    >
    {({isSubmitting, dirty }) => (
      <Form>
        <label htmlFor="email">Email Address</label>
        <Field name="email" type="email" />
        <ErrorMessage name="email" />
        <Button disabled={isSubmitting || !dirty} type="submit">
        {isSubmitting && <Spinner
          as="span"
          animation="border"
          size="sm"
          role="status"
          aria-hidden="true"
          />}
          Unmake Admin
        </Button>
      </Form>
    )}
    </Formik>
    </>
  )
}


export default AdminSettings
