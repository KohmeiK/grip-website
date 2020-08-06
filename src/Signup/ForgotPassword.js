import React, { useState, useContext } from 'react'
import FirebaseContext from '../Firebase'
import { useHistory, useLocation } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from 'formik';
import { Button, Spinner } from "react-bootstrap"

function ForgotPassword() {
  let history = useHistory()
  let location = useLocation()
  const firebase = useContext(FirebaseContext)
  const [isLoading, setLoading] = useState(false)
  const [message, setMessage] = useState()

  let { from } = location.state || { from: { pathname: "/" } };

  const handleSubmit = async (values) => {
    try {
      // //wait until log in is complete
      // await firebase.auth.signInWithEmailAndPassword(values.email, values.pwd)
      // setLoading(false)
      // history.replace(from);
    } catch (error) {
      alert(error)
    }
  }


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
