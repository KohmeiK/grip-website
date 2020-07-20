import React, {useContext} from 'react'
import { Formik, Field, Form, ErrorMessage } from 'formik';
import FirebaseContext from './Firebase/'

function AdminSettings(){
  const firebase = useContext(FirebaseContext)
  return(
    <Formik
      initialValues={{email: '' }}
      onSubmit={async(values, { setSubmitting }) => {
        try{
          console.log("RequestSent")
          const addAdminRole = firebase.functions.httpsCallable('addAdminRole')
          const result = await addAdminRole({email: values.email})
          console.log(result.data.message)
          console.log(result)
          alert(result.message)
        }catch(error){
          // Getting the Error details.
          var code = error.code
          var message = error.message
          var details = error.details
          console.log(code + " " + message + " " + details)
          alert(code + " " + message + " " + details)
        }

        setSubmitting(false);
      }}
    >
      <Form>
        <label htmlFor="email">Email Address</label>
        <Field name="email" type="email" />
        <ErrorMessage name="email" />
        <button type="submit">Make Admin</button>
      </Form>
    </Formik>
  )
}


export default AdminSettings
