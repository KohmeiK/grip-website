import React, { useState, useContext } from 'react'
import { Button, Spinner } from "react-bootstrap"
import { Formik, Field, Form, ErrorMessage } from 'formik';

import FirebaseContext from '../Firebase'

function ForgotPassword() {
  const firebase = useContext(FirebaseContext)
  const [message, setMessage] = useState()

  return (
    <div className="w-50 m-auto">
      <h3>Enter your email address</h3>
      <Formik
        initialValues={{ email: '' }}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          setTimeout(async() => {
            try{
              await firebase.auth.sendPasswordResetEmail(values.email);
              setSubmitting(false)
              resetForm()
              setMessage('Password reset email sent to the address you provided')
            }catch(err){
              setSubmitting(false)
              alert(err);
            }
          }, 1000)

        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <Field name="email" type="email" />
            <ErrorMessage name="email" />
            <br/>
            <Button disabled={isSubmitting} type="submit">
              {isSubmitting && <Spinner
                as="span"
                animation="border"
                size="sm"
                role="status"
                aria-hidden="true"
              />}
              Submit
            </Button>
            <h5>{message}</h5>
          </Form>
        )}
      </Formik>
    </div>
  )
}

export default ForgotPassword
