import React, { useContext } from 'react'
import { Button, Spinner } from "react-bootstrap"
import { Formik, Field, Form, ErrorMessage } from 'formik';

import FirebaseContext from '../Firebase/'

/**
*  This is the main admin console where admins can update the
* customClaims of any user in the system.
*
* @version 1.0
* @author [Kohmei Kadoya](https://github.com/kohmei358)
* @param {string} text
*/
function AdminSettings() {
  const firebase = useContext(FirebaseContext)

  return (
    <>
      <h5>Enter an email to see what roles this user has. </h5>
      <Formik
        initialValues={{ email: '' }}
        onSubmit={async (values, { setSubmitting }) => {
          try {
            console.log("RequestSent")
            const findRoles = firebase.functions.httpsCallable('findRoles')
            const result = await findRoles({ email: values.email })
            console.log(result.data.message, "result.data.message")
            alert(result.data.message)
            setSubmitting(false)
            return (null);
          } catch (error) {
            // Getting the Error details.
            // var code = error.code
            // var message = error.message
            // var details = error.details
            console.log(error, "Error")
            alert(error.message)
            return ("error");
          }
        }}
      >
        {({ isSubmitting, dirty }) => (
          <Form>
            <label htmlFor="email">Email Address</label>
            <Field name="email" type="email" />
            <ErrorMessage name="email" />
            <Button variant="success" disabled={isSubmitting || !dirty} type="submit">
              {isSubmitting && <Spinner
                as="span"
                animation="border"
                size="sm"
                role="status"
                aria-hidden="true"
              />}
          Check Roles
        </Button>
          </Form>
        )}
      </Formik>
      <p>
        Users can have multiple roles but normally should have one at the most.
    <br />
    (No admin + company unless for testing)
    <br />
    Company accounts start with a company role by default
    <br />
        <b>You can easily see your account's roles by looking at the color around your profile pic. </b>
        <br />White => Studnet - No Role
    <br />Red => Admin - Admin Role
    <br />Blue => Company - Company Role
    <br />Yellow => Developer - Admin and Company Role
    </p>
      <h5>Don't Forget: These changes take effect the next time the user logs in (at least for the UI). </h5>
      <Formik
        initialValues={{ email: '' }}
        onSubmit={async (values, { setSubmitting }) => {
          try {
            console.log("RequestSent")
            const addAdminRole = firebase.functions.httpsCallable('addAdminRole')
            const result = await addAdminRole({ email: values.email })
            console.log(result.data.message, "result.data.message")
            alert(result.data.message)
            setSubmitting(false)
            return (null);
          } catch (error) {
            // Getting the Error details.
            // var code = error.code
            // var message = error.message
            // var details = error.details
            console.log(error, "Error")
            alert(error.message)
            return ("error");
          }
        }}
      >
        {({ isSubmitting, dirty }) => (
          <Form>
            <label htmlFor="email">Email Address</label>
            <Field name="email" type="email" />
            <ErrorMessage name="email" />
            <Button variant="danger" disabled={isSubmitting || !dirty} type="submit">
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
        initialValues={{ email: '' }}
        onSubmit={async (values, { setSubmitting }) => {
          try {
            console.log("RequestSent")
            const addCompanyRole = firebase.functions.httpsCallable('addCompanyRole')
            const result = await addCompanyRole({ email: values.email })
            console.log(result.data.message, "result.data.message")
            alert(result.data.message)
            setSubmitting(false)
            return (null);
          } catch (error) {
            // Getting the Error details.
            // var code = error.code
            // var message = error.message
            // var details = error.details
            console.log(error, "Error")
            alert(error.message)
            return ("error");
          }
        }}
      >
        {({ isSubmitting, dirty }) => (
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
          Make Company
        </Button>
          </Form>
        )}
      </Formik>


      <Formik
        initialValues={{ email: '' }}
        onSubmit={async (values, { setSubmitting }) => {
          try {
            console.log("RequestSent")
            const addDeveloperRole = firebase.functions.httpsCallable('addDeveloperRole')
            const result = await addDeveloperRole({ email: values.email })
            console.log(result.data.message, "result.data.message")
            alert(result.data.message)
            setSubmitting(false)
            return (null);
          } catch (error) {
            // Getting the Error details.
            // var code = error.code
            // var message = error.message
            // var details = error.details
            console.log(error, "Error")
            alert(error.message)
            return ("error");
          }
        }}
      >
        {({ isSubmitting, dirty }) => (
          <Form>
            <label htmlFor="email">Email Address</label>
            <Field name="email" type="email" />
            <ErrorMessage name="email" />
            <Button variant="warning" disabled={isSubmitting || !dirty} type="submit">
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


      <Formik
        initialValues={{ email: '' }}
        onSubmit={async (values, { setSubmitting }) => {
          try {
            console.log("RequestSent")
            const deleteRoles = firebase.functions.httpsCallable('deleteRoles')
            const result = await deleteRoles({ email: values.email })
            console.log(result.data.message, "result.data.message")
            alert(result.data.message)
            setSubmitting(false)
            return (null);
          } catch (error) {
            // Getting the Error details.
            // var code = error.code
            // var message = error.message
            // var details = error.details
            console.log(error, "Error")
            alert(error.message)
            return ("error");
          }
        }}
      >
        {({ isSubmitting, dirty }) => (
          <Form>
            <label htmlFor="email">Email Address</label>
            <Field name="email" type="email" />
            <ErrorMessage name="email" />
            <Button variant="light" disabled={isSubmitting || !dirty} type="submit">
              {isSubmitting && <Spinner
                as="span"
                animation="border"
                size="sm"
                role="status"
                aria-hidden="true"
              />}
          Delete All Roles
        </Button>
          </Form>
        )}
      </Formik>


      <Formik
        initialValues={{ email: '' }}
        onSubmit={async (values, { setSubmitting }) => {
          try {
            console.log("RequestSent")
            const hello1234 = firebase.functions.httpsCallable('hello1234')
            const result = await hello1234({ email: values.email })
            console.log(result.data.message, "result.data.message")
            alert(result.data.message)
            setSubmitting(false)
            return (null);
          } catch (error) {
            // Getting the Error details.
            // var code = error.code
            // var message = error.message
            // var details = error.details
            console.log(error, "Error")
            alert(error.message)
            return ("error");
          }
        }}
      >
        {({ isSubmitting, dirty }) => (
          <Form>
            <label htmlFor="email">Email Address</label>
            <Field name="email" type="email" />
            <ErrorMessage name="email" />
            <Button variant="info" disabled={isSubmitting || !dirty} type="submit">
              {isSubmitting && <Spinner
                as="span"
                animation="border"
                size="sm"
                role="status"
                aria-hidden="true"
              />}
              Verify Email
             </Button>
          </Form>
        )}
      </Formik>
      <h5>Don't Forget: These changes take effect the next time the user logs in (at least for the UI). </h5>
    </>
  )
}


export default AdminSettings
