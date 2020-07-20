import React, { useEffect, useContext } from "react"
import FirebaseContext from './Firebase'
import AuthContext from './Firebase/AuthContext'
import { Formik, Form, Field, ErrorMessage, FieldArray } from 'formik';
import { Col, Row, Container } from 'react-bootstrap'
import ApplyContainer2 from './ApplyContainer2'

function Test (){
  return <ApplyContainer2 />
}

export default Test