import React, {useEffect, useContext} from "react"
import FirebaseContext from './Firebase'
import { Formik, Form, Field, ErrorMessage } from 'formik';


function CompanyForm(){

  const firebase = useContext(FirebaseContext)
  useEffect(() => {
    //This is called every time the component shows up on the screen

  },[]);

  return(
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
            <Field type="text" name="name" />
            <ErrorMessage name="name" component="div" />
            <br/> Company Info: <br/>
            <Field type="text" name="info" as="textarea" />
            <ErrorMessage name="info" component="div" />
            <br/>
            <button className="my-2 btn btn-primary bg-wb" type="submit" disabled={isSubmitting}>
              Submit
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );


}

export default CompanyForm
