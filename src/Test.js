import React, { useState, useEffect, useContext } from 'react'
import FirebaseContext from './Firebase'
import AuthContext from "./Firebase/AuthContext"
import {Button} from "react-bootstrap"

import { Formik, useFormik, Form, Field, ErrorMessage } from 'formik';

function Test() {
  const authContext = useContext(AuthContext)
  const firebase = useContext(FirebaseContext)

  const logOut = () => {
    firebase.auth.signOut()
  }

  return (
    <div>
      <Button onClick={logOut}> Logout</Button>
    </div>
  )
}



export default Test
