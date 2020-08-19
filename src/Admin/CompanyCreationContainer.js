import React, { useEffect, useContext, useState } from "react"
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Col, Row, Container, Spinner } from 'react-bootstrap'
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { v4 as uuidv4 } from 'uuid'

import FirebaseContext from '../Firebase'

/**
 * Company Creation Container description goes here
 */
function CompanyCreationContainer() {
  const firebase = useContext(FirebaseContext)
  const [logoURL, setLogoURL] = useState('')
  const [textValue, setTextValue] = useState('')
  const handleChange = value => {
    setTextValue(value);
  };
  const getExtension = filename => {
    return filename.split('.').pop()
  }

  /**
 * Insert text at cursor position.
 *
 * @param {string} text
 * @public
 */

  useEffect(() => {
    //This is called every time the component shows up on the screen

  }, []);

  const handleSubmit = async (values, setSubmitting, resetForm) => {
    try {
      console.log("RequestSent")
      console.log(values, "values")
      const createNewCompany = firebase.functions.httpsCallable('createNewCompany')
      const result = await createNewCompany({ formVals: values })
      console.log(result.data.message, "result.data.message")
      setSubmitting(false)
      resetForm()
      alert("Keep of a copy of the Company ID!         " + result.data.message)
      return (null);

    } catch (error) {
      console.log(error, "Error")
      setSubmitting(false)
      alert(error.message)
      return ("error");
    }
  }

  return (
    <div style={{ background: "#ba916e", marginTop: "85px" }} >
      <Container fluid style={{ paddingTop: "2em" }}>
        <Row>
          <Col>
            <div style={{ marginLeft: "1em", borderRadius: "25px", background: "white", height: "40em" }}>
              <div style={{ margin: "2em", marginTop: "0em", background: "white", height: "40em" }}>
                <h5>Comapny Creation Reminder: </h5>
                1. Comapny Info uses markdown language. <br />
                   - You can access different formattings at the toolbar, including
                bold/header/list. <br />
                   - For all lines except those for headers and lists, type two spaces at the end to make a line break.<br />
                   - Upon completion, click the eye icon in the tool bar to preview how it will be displayed. (Make sure you do this before submitting!)<br />
                   - If you accidentally expand the typearea, simiply press esc key. <br />
                <br />
                2. To retrieve company logo url, upload the image on the right; the textbox will be filled automatically. <br />
                <br />
                3. It takes some time after you click submit; you will be alerted when the process is completed.
            </div>
            </div>
          </Col>
          <Col sm={5}>
            <div>
              <Formik
                initialValues={{ name: '', info: '', email: '', pwd: '', url: '' }}
                validate={values => {
                  const errors = {};
                  if (!values.name) {
                    errors.name = 'Required';
                  }
                  if (!textValue) {
                    errors.info = 'Required';
                  }
                  if (!values.email) {
                    errors.email = 'Required';
                  }
                  if (!values.pwd) {
                    errors.pwd = 'Required';
                  }
                  if (!logoURL) {
                    errors.url = 'Required; upload the company logo on the right';
                  }
                  return errors;
                }}
                onSubmit={(values, { setSubmitting, resetForm }) => {
                  values.info = textValue
                  values.url = logoURL
                  alert(JSON.stringify(values, null, 2))
                  resetForm()
                  setTextValue('')
                  setLogoURL('') // a part of resetForm
                  handleSubmit(values, setSubmitting, resetForm)
                }}

              >
                {({ isSubmitting, values }) => (
                  <Form>
                    Company Name: <br />
                    <Field type="text" name="name" style={{ width: "100%" }} />
                    <ErrorMessage name="name" component="div" />
                    <br />
                    Company Info: <br />
                    <SimpleMDE value={textValue} onChange={handleChange} />
                    {/* <Field type="text" name="info" value={textValue} style={{ width: "100%" }} /> */}
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
                    Company Logo URL: <br />
                    <Field type="text" name="url" style={{ width: "100%" }} value={logoURL} disabled />
                    <ErrorMessage name="url" component="div" />

                    <button className="my-2 btn btn-primary bg-wb" type="submit" disabled={isSubmitting}>
                      {isSubmitting && <Spinner
                        as="span"
                        animation="border"
                        size="sm"
                        role="status"
                        aria-hidden="true"
                      />}
                      Submit
                    </button>
                  </Form>
                )}
              </Formik>
            </div>

          </Col>
          <Col sm={4}> {/* place for uploading company logo */}
            <Formik
              initialValues={{ file: null }}

              validate={values => {
                const errors = {};
                if (!values.file) {
                  errors.file = 'Required';
                }
                return errors;
              }}

              onSubmit={(values, { resetForm, setSubmitting }) => {
                let logo = values.file
                let storageRef = firebase.storage
                let fileName = uuidv4() + '.' + getExtension(values.file.name)
                let logoRef = storageRef.child(fileName) 
                logoRef.put(logo).then(async function () {
                  logoRef.getDownloadURL().then(function (url) {
                    setLogoURL(url)
                    setSubmitting(false)
                    resetForm()
                  })
                })
              }}>
              {({ values, isSubmitting, handleSubmit, setFieldValue }) => (
                <form onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label htmlFor="file">Company Logo Upload</label>
                    <input id="file" name="file" type="file" accept="image/*" onChange={(event) => {
                      setFieldValue("file", event.currentTarget.files[0]);
                    }} className="form-control" />
                    <ErrorMessage name="file" component="div" />
                  </div>
                  <br />
                  {isSubmitting
                    ? <button type="submit" className="btn btn-dark" disabled>Uploading</button>
                    : <button type="submit" className="btn btn-primary">Submit</button>}
                </form>

              )}
            </Formik>
          </Col>
        </Row>
      </Container>
    </div>
  );


}

export default CompanyCreationContainer
