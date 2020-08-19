import React, { useState, useContext } from 'react'
import { useFormik } from 'formik';
import { useHistory, useLocation } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage, FieldArray, useField, useFormikContext} from 'formik';
import { Button, Container, Spinner, Row, Col } from 'react-bootstrap'

import styles from "./Login.module.scss"
import { LinkContainer } from 'react-router-bootstrap'
import FirebaseContext from '../Firebase'

const MyTextInput = ({ label, ...props }) => {
  // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
  // which we can spread on <input> and alse replace ErrorMessage entirely.
  const [field, meta] = useField(props);
  return (
    <>
      <label htmlFor={props.id || props.name}>{label}</label>
      {meta.touched && meta.error ? (<>
        <input className="textFieldError" {...field} {...props} />
        <div >{meta.error}</div>
      </>) :
        (<input {...field} {...props} />)
      }
    </>
  );
};

function Login() {
  let history = useHistory()
  let location = useLocation()
  const firebase = useContext(FirebaseContext)
  const [isLoading, setLoading] = useState(false)
  const [errorText, setErrorText] = useState("")

  let { from } = location.state || { from: { pathname: "/" } };

  return(
    <div className={styles.background}>
    <div className={styles.mainBox}>
      <div className={styles.leftCol}>
      </div>
      <Formik
        initialValues={{ email: '', pass: ''}}
        validate={values => {
          const errors = {};
          if (!values.email) {
            errors.email = 'Required';
          }
          if (!values.pass) {
            errors.pass = 'Required';
          }
          return errors;
        }}
        onSubmit={async (values, { setSubmitting, resetForm }) => {
          try{
            //wait until log in is complete
            await firebase.auth.signInWithEmailAndPassword(values.email, values.pass)
            setLoading(false)
            history.replace(from);
          }catch(error){
            setErrorText(error.message);
          }
        }}
      >
        {({ values, isSubmitting }) => (
          <div className={styles.rightCol}>
          <Form className={styles.formWrapper}>
            <h4>{from.pathname !== '/' ? " Log in to view the page: "+from.pathname : "Welcome Back!" }</h4>
            <p>Log in to continue</p>
            <div className={errorText != "" && styles.serverError}>
              {errorText}
            </div>
            <MyTextInput label="EMAIL" type="text" name="email" placeholder="yourEmail@example.com" />
            <MyTextInput label="PASSWORD" type="password" name="pass" placeholder="Your Password"/>
            <LinkContainer to="forgotPassword">
              <a>
              Forgot?
              </a>
            </LinkContainer>
            <button className={styles.mainButton} type="submit" disabled={isSubmitting}>
              {isSubmitting && <Spinner
                as="span"
                animation="border"
                size="sm"
                role="status"
                aria-hidden="true"
              />}
              Login
            </button>
            <hr />
            <p className={styles.or}>OR</p>
            <LinkContainer to="signup">
              <button className={styles.subButton}> Create new account</button>
            </LinkContainer>
          </Form>
          </div>
        )}

      </Formik>
    </div>
    </div>
  )
}

export default Login
