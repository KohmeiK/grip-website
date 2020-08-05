import React, { useState, useContext } from 'react'
import FirebaseContext from '../Firebase'
import { useHistory, useLocation } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from 'formik';
import {Button, Spinner} from "react-bootstrap"

function ForgotPassword() {
  let history = useHistory()
  let location = useLocation()
  const firebase = useContext(FirebaseContext)
  const [isLoading, setLoading] = useState(false)

  let { from } = location.state || { from: { pathname: "/" } };

  const handleSubmit = async (values) => {
    try {
      //wait until log in is complete
      await firebase.auth.signInWithEmailAndPassword(values.email, values.pwd)
      setLoading(false)
      history.replace(from);
    } catch (error) {
      alert(error)
    }
  }

  
  return (
    <div className="w-50 m-auto">
      <h3>Enter your password</h3>
      <Formik
        initialValues={{ email: '' }}
        onSubmit={async (values, { setSubmitting }) => {
          
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <label htmlFor="email">Email Address</label>
            <Field name="email" type="email" />
            <ErrorMessage name="email" />
            <Button variant="warning" disabled={isSubmitting} type="submit">
              {isSubmitting && <Spinner
                as="span"
                animation="border"
                size="sm"
                role="status"
                aria-hidden="true"
              />}
              Make Developer
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  )
}

export default ForgotPassword
