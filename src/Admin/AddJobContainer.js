import React, { useEffect, useContext, useState } from "react"
import { Formik, Form, Field, ErrorMessage, FieldArray } from 'formik';
import { Col, Row, Container, Spinner } from 'react-bootstrap'
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";

import FirebaseContext from '../Firebase'

/**
 * Company Creation Container description goes here
 */
function AddJobContainer() {
  const firebase = useContext(FirebaseContext)
  const [logoURL, setLogoURL] = useState('')
  const [textValue, setTextValue] = useState('')
  const handleChange = value => {
    setTextValue(value);
  };

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
    <div style={{ background: "#ba916e" }} >
      <Container fluid style={{ paddingTop: "2em" }}>
        <Row>
          <Col>
            <div style={{ marginLeft: "1em", borderRadius: "25px", background: "white", height: "40em" }}>
              <div style={{ margin: "2em", marginTop: "0em", background: "white", height: "40em" }}>
              <h5>Adding a Job Reminder: </h5>
                1. Job Info uses markdown language. <br/>
                   - You can access different formattings at the toolbar, including 
                bold/header/list. <br />
                   - For all lines except those for headers and lists, type two spaces at the end to make a line break.<br/>
                   - Upon completion, click the eye icon in the tool bar to preview how it will be displayed. (Make sure you do this before submitting!)<br/>
                   - If you accidentally expand the typearea, simiply press esc key. <br/>
                <br/>
                2. Required skills and preferred skills can be left blank. <br/>
                <br/>
                3. It takes some time after you click submit; you will be alerted when the process is completed. 
            </div>
            </div>
          </Col>
          <Col sm={5}>
            {/* add a job to a company */}
            <div>
              <Formik
                initialValues={{ companyID: '', title: '', info: '', dl: '', duration: '', reqSkills: [], 
                                  preSkills: [], location: '', reqCoverLetter: '', regionForSearch: '' }}
                validate={values => {
                  const errors = {};
                  if (!values.companyID) {
                    errors.companyID = 'Required';
                  }
                  if (!values.title) {
                    errors.title = 'Required';
                  }
                  if (!textValue) {
                    errors.info = 'Required';
                  }
                  if (!values.dl) {
                    errors.dl = 'Required';
                  }
                  if (!values.duration) {
                    errors.duration = 'Required';
                  }
                  if (!values.location) {
                    errors.location = 'Required';
                  }
                  if (!values.reqCoverLetter) {
                    errors.reqCoverLetter = 'Required';
                  }
                  if (!values.regionForSearch) {
                    errors.regionForSearch = 'Required';
                  }
                  return errors;
                }}
                onSubmit={async (values, { setSubmitting, resetForm }) => {
                  try {
                    values.info = textValue
                    alert(JSON.stringify(values, null, 2))
                    console.log("RequestSent")
                    console.log(values, "values")
                    const addNewJob = firebase.functions.httpsCallable('addNewJob')
                    const result = await addNewJob({ formVals: values })
                    console.log(result.data.message, "result.data.message")
                    resetForm()
                    setTextValue('')
                    setSubmitting(false)
                    alert(result.data.message)
                    return (null);

                  } catch (error) {
                    console.log(error, "Error")
                    setSubmitting(false)
                    alert(error.message)
                    return ("error");
                  }
                }}
              >
                {({ values, isSubmitting }) => (
                  <Form>
                    <h4>Add a Job to a Company</h4>
                    Company ID: <br />
                    <Field type="text" name="companyID" style={{ width: "100%" }} />
                    <ErrorMessage name="companyID" component="div" />
                    <br />
                    Job Title: <br />
                    <Field type="text" name="title" style={{ width: "100%" }} />
                    <ErrorMessage name="title" component="div" />
                    <br />
                    Info: <br />
                    <SimpleMDE value={textValue} onChange={handleChange} />
                    {/* <Field type="text" name="info" as="textarea" style={{ width: "100%" }} /> */}
                    <ErrorMessage name="info" component="div" />
                    {/* <br/> */}
                    Deadline: <br />
                    <Field type="text" name="dl" style={{ width: "100%" }} />
                    <ErrorMessage name="dl" component="div" />
                    <br />
                    Duration: <br />
                    <Field type="text" name="duration" style={{ width: "100%" }} />
                    <ErrorMessage name="diratom" component="div" />
                    <br />
                    Required Skills: <br />
                    <FieldArray
                      name="reqSkills"
                      render={arrayHelpers => (
                        <div>
                          {values.reqSkills && values.reqSkills.length > 0 ? (
                            values.reqSkills.map((skill, index) => (
                              <div key={index}>
                                Skill {index + 1}:
                                <Field type="text" name={`reqSkills.${index}`} style={{ width: "80%" }} />
                                <button
                                  type="button"
                                  onClick={() => arrayHelpers.remove(index)} // remove a skill from the list
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
                                {/* show this when user has removed all skills from the list */}
                                Add a skill
                              </button>
                            )}
                        </div>
                      )}
                    />
                    Preferred Skills: <br />
                    <FieldArray
                      name="preSkills"
                      render={arrayHelpers => (
                        <div>
                          {values.preSkills && values.preSkills.length > 0 ? (
                            values.preSkills.map((skill, index) => (
                              <div key={index}>
                                Skill {index + 1}:
                                <Field type="text" name={`preSkills.${index}`} style={{ width: "80%" }} />
                                <button
                                  type="button"
                                  onClick={() => arrayHelpers.remove(index)} // remove a skill from the list
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
                                {/* show this when user has removed all skills from the list */}
                                Add a skill
                              </button>
                            )}
                        </div>
                      )}
                    />
                    {/* <br /> */}
                    Location: <br />
                    <Field type="text" name="location" style={{ width: "100%" }} />
                    <ErrorMessage name="location" component="div" />
                    <br />
                    Requires cover letter? <br />
                    <Field
                      name="reqCoverLetter"
                      render={({ field }) => (
                        <>
                          <div className="radio-item">
                            <input
                              {...field}
                              id="yes"
                              value='true'
                              name="reqCoverLetter"
                              type="radio"
                            />
                            <label htmlFor="yes">Yes</label>
                          </div>
                          <div className="radio-item">
                            <input
                              {...field}
                              id="no"
                              value='false'
                              name="reqCoverLetter"
                              type="radio"
                            />
                            <label htmlFor="no">No</label>
                          </div>
                        </>
                      )}
                    />
                    <ErrorMessage name="reqCoverLetter" component="div" />
                    {/* <br/> */}
                    Region (for searching purpose): <br />
                    <Field name="regionForSearch" as="select" style={{ width: "100%" }} >
                      <option value="" disabled selected>Select a region</option>
                      <option value="region1">Region 1</option>
                      <option value="region2">Region 2</option>
                      <option value="region3">Region 3</option>
                    </Field>
                    <ErrorMessage name="regionForSearch" component="div" />


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
          <Col sm={4}>
            More Settings
          </Col>
        </Row>
      </Container>
    </div >
  );


}

export default AddJobContainer
