import React, { useState, useEffect, useContext } from 'react'
import FirebaseContext from './Firebase'
import AuthContext from './Firebase/AuthContext'
import { Formik, useFormik, Form, Field, ErrorMessage } from 'formik';
import { useHistory, useLocation } from "react-router-dom";
import {Button} from "react-bootstrap"

function Login() {
  let history = useHistory()
  let location = useLocation()
  const firebase = useContext(FirebaseContext)
  const authContext = useContext(AuthContext)
  const [isLoading, setLoading] = useState(false)

  let { from } = location.state || { from: { pathname: "/" } };

  const handleSubmit = async(values) => {
    try{
      //wait until log in is complete
      await firebase.auth.signInWithEmailAndPassword(values.email, values.pwd)
      setLoading(false)
      history.replace(from);
    }catch(error){
      alert(error)
    }
  }

  const formik = useFormik({
    initialValues: {
      email: '',
      pwd: '',
    },
    onSubmit: (values,{resetForm}) => {
      resetForm()
      setLoading(true)
      handleSubmit(values)
    },
  })
  return (
    <div className="w-50 m-auto">
      <h3>Login to view the page {from.pathname}</h3>
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
        <Button disabled={isLoading} type="submit">Submit</Button>
      </form>

      <br />
      <h4> No account? </h4>
      <Button variant="secondary" onClick={()=>history.push("/signup")}>Sign Up</Button>

    </div>
  )
}

export default Login
