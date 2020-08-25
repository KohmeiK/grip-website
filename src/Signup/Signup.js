import React, { useContext, useState } from 'react'
import { Button, Spinner } from 'react-bootstrap'
import { useHistory } from "react-router-dom";
import {useFormik, Formik, Form, Field, ErrorMessage, FieldArray, useField, useFormikContext} from 'formik';
import * as Yup from "yup"

import { LinkContainer } from 'react-router-bootstrap'
import FirebaseContext from '../Firebase'
import styles from './Signup.module.scss'

const MyTextInput = ({ label, ...props }) => {
  // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
  // which we can spread on <input> and alse replace ErrorMessage entirely.
  const [field, meta] = useField(props);

  return (
    <>
      <label htmlFor={props.id || props.name}>{label}</label>
      <div className={`${styles.inputBorder} ${meta.touched && meta.error && styles.error}`}>
        <input {...field} {...props} />
      </div>
      {meta.touched && meta.error ? (<>
        <div className={styles.errorMsg}>{meta.error}</div>
      </>) : null
      }
    </>
  );
};

const MySelect = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <>
      <label htmlFor={props.id || props.name}>{label}</label>
      <div className={`${styles.inputBorder} ${meta.touched && meta.error && styles.error}`}>
        <select {...field} {...props} />
      </div>
      {meta.touched && meta.error ? (
        <div className={styles.errorMsg}>{meta.error}</div>
      ) : null}
    </>
  );
};

function Signup() {
    const firebase = useContext(FirebaseContext)
    let history = useHistory()
    const [errorText, setErrorText] = useState("")

    const handleSubmit = async (values, resetForm, setSubmitting) => {
        try {

            //Wait to do anything until account is made
            const res = await firebase.auth.createUserWithEmailAndPassword(values.email, values.pwd)

            //make changes to user before saving, wait until changes made
            await res.user.updateProfile({ displayName: values.name })

            const user = res.user

            // write in database
            firebase.db.collection("students").doc(user.uid).set({
                school: values.school,
                classYear: values.classYear,
                displayName: values.name,
                lastUploadTime: null,
                defResumeName: ''
            })

            user.sendEmailVerification()
            history.push("/verifyEmail")

        } catch (err) {
            //Catch all errors here!
            setErrorText(err.message);
            setSubmitting(false)
        }
    }


    const getSchool = (email) => {
        let withoutEdu = email.substring(0, email.length - 4) // drop .edu
        let at = withoutEdu.indexOf('@')
        let lastDot = withoutEdu.lastIndexOf('.')
        let school = withoutEdu.substring(Math.max(at, lastDot) + 1) // look for the substring b/n the last dot or @, which will be the school name
        return school
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
        <Formik
          initialValues={{
              name: '',
              email: '',
              pwd: '',
              pwdConfirm: '',
              classYear: '',
          }}
          onSubmit={(values, { resetForm, setSubmitting }) => {
              values.school = getSchool(values.email)
              handleSubmit(values, resetForm, setSubmitting)
          }}
          validationSchema={Yup.object({
              name: Yup.string()
                  .required('Required'),
              email: Yup.string()
                  .email('Invalid email address')
                  // .matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.+-]+\.edu$/, 'Please sign up with a .edu email')
                  .required('Required'),
              pwd: Yup.string()
                  .min(6, 'Must be 6 characters or more')
                  .required('Required'),
              pwdConfirm: Yup.string()
                  .oneOf([Yup.ref('pwd'), null], 'Passwords must match'),
              classYear: Yup.string()
                  .required('Required'),
          })}
        >
        {({ values, isSubmitting }) => (
          <div className={styles.mainBox}>
            <div className={styles.leftCol}>
              <div className={styles.infoWrapper}>
                <h4>Step 1 of 4: </h4>
                <h2> Sign up</h2>
                <p>Sign up using your university (.edu) email. A verification link will be sent to your inbox. </p>
                <hr/>
                <div> OR </div>
                <LinkContainer to="login">
                  <button className={styles.subButton}> Log in</button>
                </LinkContainer>
              </div>
            </div>
            <div className={styles.rightCol}>
                <Form className={styles.formWrapper}>
                    <h5>Sign Up</h5>
                    <div className={errorText != "" && styles.serverError}>
                      {errorText}
                    </div>
                    <MyTextInput label="FULL NAME" type="text" name="name" placeholder="John Smith" id="name" />
                    <MyTextInput label="EMAIL" type="email" name="email" placeholder="example@email.com" id="email" />
                    <MyTextInput label="PASSWORD" type="password" name="pwd" placeholder="password" id="pwd" />
                    <MyTextInput label="RE-ENTER PASSWORD" type="password" name="pwdConfirm" placeholder="password" id="pwdConfirm" />
                    <MySelect label="GRADUATION YEAR" as="select" name="classYear" id="classYear">
                      <option value="" disabled selected>Select a year</option>
                      {dropDown}
                    </MySelect>
                    <button className={styles.mainButton} type="submit" disabled={isSubmitting}>
                      {isSubmitting && <Spinner
                        as="span"
                        animation="border"
                        size="sm"
                        role="status"
                        aria-hidden="true"
                      />}
                      Create Account
                    </button>
                    <p> By signing up, you agree to our <b>Terms & Privacy Policy </b></p>
                    <hr/>
                    <div className={styles.or}> OR </div>
                    <LinkContainer to="login">
                      <button className={styles.subButton}> Log in</button>
                    </LinkContainer>
                </Form>
            </div>
          </div>
        )}
      </Formik>
    )
}

export default Signup
