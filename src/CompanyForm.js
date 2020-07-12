import React, {useEffect, useContext} from "react"
import FirebaseContext from './Firebase'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import {Col, Row, Container} from 'react-bootstrap'


function CompanyForm(){

  const firebase = useContext(FirebaseContext)
  useEffect(() => {
    //This is called every time the component shows up on the screen

  },[]);

  return(
    <div style={{background:"#e0e0e0"}} >
    <Container fluid style={{paddingTop: "2em"}}>
      <Row>
        <Col>
          <div style={{marginLeft: "1em", borderRadius: "25px", background:"white", height: "40em"}}>
            <div style={{margin: "2em", marginTop: "0em",  background:"white", height: "40em"}}>
              Margin Intentionally Left Blank
            </div>
          </div>
        </Col>
        <Col sm={5}>
        <div>
          <Formik
            initialValues={{ name: '', info: ''}}
            onSubmit={(values, { setSubmitting, resetForm }) => {
              setTimeout(() => {

                  firebase.db.collection('companies').add({
                      companyName: values.name,
                      info: values.info
                  }).then(function (docRef){
                      console.log(docRef.id)
                      alert('success! Ref: ' + docRef.id)
                  })
                  .catch(function(error){
                      alert('Error writing document: ', error)
                  })
                  resetForm()
              }, 200);

            }}
          >
            {({ isSubmitting }) => (
              <Form>
                Company Name: <br/>
                <Field type="text" name="name" style={{width: "100%"}}/>
                <ErrorMessage name="name" component="div" />
                <br/> Company Info: <br/>
                <Field type="text" name="info" as="textarea" style={{width: "100%"}} />
                <ErrorMessage name="info" component="div" />
                <br/>
                <button className="my-2 btn btn-primary bg-wb" type="submit" disabled={isSubmitting}>
                  Submit
                </button>
              </Form>
            )}
          </Formik>
        </div>
        </Col>
        <Col sm={4}>More Settings</Col>
      </Row>
    </Container>
    </div>
  );


}

export default CompanyForm
