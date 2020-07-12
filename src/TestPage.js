import React, { useState, useEffect, useContext } from 'react'
import FirebaseContext from './Firebase'
import 'firebase/firestore';

// import fire from './Fire';

import { Formik, useFormik, Form, Field, ErrorMessage } from 'formik';

function TestPage() {


  // useEffect(() => {

  // },[]); //Run only onMount

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    onSubmit: values => {
      alert(JSON.stringify(values, null, 2))
    },
  })
  return (
    <div>
      <h1>LOGIN</h1>
      <form onSubmit={formik.handleSubmit}>
        <label htmlFor="email">Email: </label>
        <input
          id="email"
          name="email"
          type="email"
          onChange={formik.handleChange}
          value={formik.values.email}
        />
        <label htmlFor="password">Password: </label>
        <input
          id="pwd"
          name="pwd"
          type="password"
          onChange={formik.handleChange}
          value={formik.values.pwd}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  )
}



export default TestPage
