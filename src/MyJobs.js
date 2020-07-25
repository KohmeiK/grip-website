import React, { useState, useContext, useEffect } from 'react'
import FirebaseContext from './Firebase'
import AuthContext from './Firebase/AuthContext'
import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import { CardColumns, Form, InputGroup, FormControl } from 'react-bootstrap'

function MyJobs() {
  const firebase = useContext(FirebaseContext)
  const authContext = useContext(AuthContext)
  const [jobs, setJobs] = useState([]) //Data from DB
  const [display, setDisplay] = useState("Not Set") //JSX for List
  const [indexToShow, setIndexToShow] = useState(-1); //Modal
  const [show, setShow] = useState(false); //Modal show
  const [loading, setLoading] = useState(true); //Still loading array
  const handleClose = () => setShow(false);
  const handleShow = (index) => {
    setIndexToShow(index)
    setShow(true)
  }
  const handleClick = (index) => {
      // something should happen for each job
      console.log(index)
  }

  useEffect(() => {
    //Only on mount
    firebase.db.collection('jobs').where("companyID", "==", authContext.user.uid)
      .get()
      .then(function (querySnapshot) { // search for jobs belonging to this company
        if (querySnapshot.docs.length === 0) {
          return (<h1> You have no currently posted jobs! </h1>)
        }
        querySnapshot.forEach(function (doc) {
          let job = doc.data()
          job.applicantNum = job.applicants.length // so this way the number of applicant is included
          setJobs(jobs.push(job)) //Add all jobs to array
        })
        setJobs(jobs)
        setLoading(false)
      }).catch(function (error) {
        console.log(error)
      })
  }, [])

  let localDisplay = "Loading..."
  if (!loading) {
    localDisplay = jobs.map((job, index) => { //Convert each element to JSX
      //convert all elements before reach render, this is only updates when show is changed
      return (
        <div key={index}>
          <br />
          <Card>
            {/* <Card.Img variant="top" src={imageURL} style={{ height: "7em" }} /> */}
            <Card.Body>
              <Card.Title>{job.title}</Card.Title>
              <Card.Text>
                <pre>
                  Deadline: {job.deadline} <br/>
                  Number of Applicants: {job.applicantNum}
                </pre>
              </Card.Text>
            </Card.Body>
            <Card.Footer>
              <Button onClick={handleClick(index)}> Download all resumes </Button>
            </Card.Footer>
          </Card>
        </div>
      );
    })
  }

  return (
    <div style={{ background: "#e0e0e0" }}>
      <h1>A company only page that lists out jobs and allows resume download</h1>
      <Container fluid style={{ paddingTop: "2em" }}>
        <Row>
          <Col>
            <div style={{ marginLeft: "1em", borderRadius: "25px", background: "white", height: "40em" }}>
              <div style={{ margin: "2em", marginTop: "0em", background: "white", height: "40em" }}>
                Search Options Go Here
            </div>
            </div>
          </Col>
          <Col sm={7}>
            {localDisplay}
          </Col>
          <Col sm={3}>More Settings</Col>
        </Row>
      </Container>
    </div >
  )
}

export default MyJobs

