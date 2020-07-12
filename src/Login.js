import React, { useState, useEffect, useContext } from 'react'
import FirebaseContext from './Firebase'

import { Formik, useFormik, Form, Field, ErrorMessage } from 'formik';

function Login() {
  const firebase = useContext(FirebaseContext)
  let auth = firebase.auth

  const formik = useFormik({
    initialValues: {
      email: '',
      pwd: '',
    },
    onSubmit: values => {
      auth.signInWithEmailAndPassword(values.email, values.pwd)
        .catch(error => {
          alert(error.message)
        })
      auth.onAuthStateChanged(user => {
        if (user.displayName === null) {
          alert('Welcome, ' + user.email)
        } else {
          alert('Welcome, ' + user.displayName)
        }
      })
    },
  })
  return (
    <div>
      <h3>Login</h3>
      <form onSubmit={formik.handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email: </label>
          <input
            id="email"
            name="email"
            type="email"
            className="form-control"
            onChange={formik.handleChange}
            value={formik.values.email}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password: </label>
          <input
            id="pwd"
            name="pwd"
            type="password"
            className="form-control"
            onChange={formik.handleChange}
            value={formik.values.pwd}
          />
        </div>
        <button type="submit">Submit</button>
      </form>

    </div>
  )
}



export default Login
