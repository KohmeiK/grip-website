import React, { useEffect, useContext } from "react"
import FirebaseContext from './Firebase'
import AuthContext from './Firebase/AuthContext'
import { Formik, Form, Field, ErrorMessage, FieldArray } from 'formik';
import { Col, Row, Container } from 'react-bootstrap'


function CompanyForm() {
  const firebase = useContext(FirebaseContext)
  const authContext = useContext(AuthContext)
  useEffect(() => {
    //This is called every time the component shows up on the screen

  }, []);

  const handleSubmit = async (values) => {
    try {

      //Wait to do anything until account is made
      const res = await firebase.auth.createUserWithEmailAndPassword(values.email, values.pwd)

      //make changes to user before saving, wait until changes made
      await res.user.updateProfile({ displayName: values.name })

      //update user value for context
      authContext.setUser(res.user);

      //I can access authContext.user immedealty here
      //setUser is async so we need to deal with that

      const user = res.user

      // write in database
      firebase.db.collection("companies").doc(user.uid).set({
        info: values.info,
        jobs: new Array(0)
      })

      firebase.db.collection("jobs").add({
        title: values.jobTitle,
        info: values.jobInfo,
        deadline: values.jobDl,
        companyID: user.uid,
        applicants: new Array(0)
      })

      values.extraJobs.forEach((job, index) => {
        firebase.db.collection("jobs").add({
          title: job.title,
          info: job.info,
          deadline: job.dl,
          companyID: user.uid,
          applicants: new Array(0)
        })
      })

      alert('Successfully created a company, log in again')
      // history.push("/upload")

    } catch (err) {
      //Catch all errors here!
      console.log(err)
      alert(err)
    }
  }

  return (
    <div style={{ background: "#e0e0e0" }} >
      <Container fluid style={{ paddingTop: "2em" }}>
        <Row>
          <Col>
            <div style={{ marginLeft: "1em", borderRadius: "25px", background: "white", height: "40em" }}>
              <div style={{ margin: "2em", marginTop: "0em", background: "white", height: "40em" }}>
                Margin Intentionally Left Blank
            </div>
            </div>
          </Col>
          <Col sm={5}>
            <div>
              <Formik
                initialValues={{ name: '', info: '', email: '', pwd: '', jobTitle: '', jobInfo: '', jobDl: '', extraJobs: [] }}
                validate={values => {
                  const errors = {};
                  if (!values.name) {
                    errors.name = 'Required';
                  }
                  if (!values.info) {
                    errors.info = 'Required';
                  }
                  if (!values.email) {
                    errors.email = 'Required';
                  }
                  if (!values.pwd) {
                    errors.pwd = 'Required';
                  }
                  if (!values.jobTitle) {
                    errors.jobTitle = 'Required';
                  }
                  if (!values.jobInfo) {
                    errors.jobInfo = 'Required';
                  }
                  if (!values.jobDl) {
                    errors.jobDl = 'Required';
                  }
                  return errors;
                }}
                onSubmit={(values, { setSubmitting, resetForm }) => {
                  handleSubmit(values)
                  // alert(JSON.stringify(values, null, 2))
                  // setTimeout(() => {

                  //   firebase.db.collection('companies').add({
                  //     companyName: values.name,
                  //     info: values.info
                  //   }).then(function (docRef) {
                  //     console.log(docRef.id)
                  //     alert('success! Ref: ' + docRef.id)
                  //   })
                  //     .catch(function (error) {
                  //       alert('Error writing document: ', error)
                  //     })
                  //   resetForm()
                  // }, 200);

                }}
                
              >
                {({ isSubmitting, values }) => (
                  <Form>
                    Company Name: <br />
                    <Field type="text" name="name" style={{ width: "100%" }} />
                    <ErrorMessage name="name" component="div" />
                    <br />
                    Company Info: <br />
                    <Field type="text" name="info" as="textarea" style={{ width: "100%" }} />
                    <ErrorMessage name="info" component="div" />
                    <br />
                    Preferred Login Email: <br />
                    <Field type="email" name="email" style={{ width: "100%" }} />
                    <ErrorMessage name="email" component="div" />
                    <br />
                    Temporary Password: <br />
                    <Field type="text" name="pwd" style={{ width: "100%" }} />
                    <ErrorMessage name="pwd" component="div" />
                    <br />
                    Job1 Title: <br />
                    <Field type="text" name="jobTitle" style={{ width: "100%" }} />
                    <ErrorMessage name="jobTitle" component="div" />
                    <br />
                    Job1 Info: <br />
                    <Field type="text" name="jobInfo" as="textarea" style={{ width: "100%" }} />
                    <ErrorMessage name="jobInfo" component="div" />
                    <br />
                    Job1 Deadline: <br />
                    <Field type="text" name="jobDl" style={{ width: "100%" }} />
                    <ErrorMessage name="jobDl" component="div" />
                    <br />


                    <FieldArray
                      name="extraJobs"
                      render={arrayHelpers => (
                        <div>
                          {values.extraJobs && values.extraJobs.length > 0 ? (
                            values.extraJobs.map((job, index) => (
                              <div key={index}>
                                Job{index + 2} Title: <br /> 
                                <Field type="text" name={`extraJobs.${index}.title`} style={{width: "100%" }} />
                                Job{index + 2} Info: <br /> 
                                <Field type="text" name={`extraJobs.${index}.info`} style={{width: "100%" }} />
                                Job{index + 2} Deadline: <br /> 
                                <Field type="text" name={`extraJobs.${index}.dl`} style={{width: "100%" }} />
                                <button
                                  type="button"
                                  onClick={() => arrayHelpers.remove(index)} // remove a job from the list
                                >
                                  -
                                </button>
                                <button
                                  type="button"
                                  onClick={() => arrayHelpers.insert(index, '')} // insert an empty string at a position
                                >
                                  +
                                </button>
                              </div>
                            ))
                          ) : (
                              <button type="button" onClick={() => arrayHelpers.push('')}>
                                {/* show this when user has removed all friends from the list */}
                                Add a job
                              </button>
                            )}
                        </div>
                      )}
                    />


                    <button className="my-2 btn btn-primary bg-wb" type="submit" disabled={isSubmitting}>
                      Submit
                </button>
                  </Form>
                )}
              </Formik>

              <br />
              Kohmei can you figure out how to reset form after clicking submit
            </div>
          </Col>
          <Col sm={4}>More Settings</Col>
        </Row>
      </Container>
    </div>
  );


}

export default CompanyForm
