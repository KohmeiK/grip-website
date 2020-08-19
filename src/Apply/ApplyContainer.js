import React, {useState, useContext, useEffect} from 'react'
import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import {Form, InputGroup, FormControl} from 'react-bootstrap'

import FirebaseContext from '../Firebase'
import AuthContext from '../Firebase/AuthContext'

import JobContainer from './JobContainer'

function ApplyContainer(){
  const firebase = useContext(FirebaseContext)
  const authContext = useContext(AuthContext)
  const [jobs, setJobs] = useState([]) //Data from DB
  const [indexToShow, setIndexToShow] = useState(-1); //Modal
  const [show, setShow] = useState(false); //Modal show
  const [loading, setLoading] = useState(true); //Still loading array
  const handleClose = () => setShow(false);
  const handleShow = (index) => {
    setIndexToShow(index)
    setShow(true)
  }

  useEffect(() => {
    //Only on mount
    firebase.db.collection('jobs')
    .get()
    .then(function (querySnapshot){ // no condition for query, thus returns all jobs
        if (querySnapshot.docs.length === 0){
          return(<h1> Oops, there are currently no available internships! </h1>)
        }
        querySnapshot.forEach(function (doc){
          let job = doc.data()
          job.jobID = doc.id // so this way job's document id is included
          setJobs(jobs.push(job)) //Add all jobs to array
        })
        setJobs(jobs)
        setLoading(false)
    }).catch(function(error){
        console.log(error)
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  let localDisplay = "Loading..."
  if(!loading)
  {
    localDisplay = jobs.map(function annon(job, index){ //Convert each element to JSX
      //convert all elements before reach render, this is only updates when show is changed
      return(
        <div>
          <br />
          <JobContainer
            key={index}
            index={index}
            title={job.title}
            jobID={job.jobID}
            info={job.info}
            dl={job.deadline}
            duration={job.duration}
            reqSkills={job.reqSkills}
            preSkills={job.preSkills}
            location={job.location}
            companyInfo={job.companyInfo}
            companyName={job.companyName}
            companyLogoURL={job.companyLogoURL}
            reqCoverLetter={job.reqCoverLetter}
            handleClose={handleClose}
            handleShow={handleShow}
            show={show && (index === indexToShow) ? true : false}
            studentName={authContext.user.displayName}
            studentID={authContext.user.uid}
           />
        </div>
      );
    })
  }

  return(
    <div style={{background:"#e0e0e0"}} >
    <Container fluid style={{paddingTop: "2em"}}>
      <Row>
        <Col>
          <div style={{marginLeft: "1em", borderRadius: "25px", background:"white", height: "40em"}}>
            <div style={{margin: "2em", marginTop: "0em",  background:"white", height: "40em"}}>
              Search Options Go Here
            </div>
          </div>
        </Col>
        <Col sm={7}>
        <Form>
          <Form.Row className="align-items-center">
            <Col>
              <Form.Label htmlFor="inlineFormInputGroup" srOnly>
                Some Eventual Search Feature Could Go Here
              </Form.Label>
              <InputGroup className="mb-2">
                <FormControl id="inlineFormInputGroup" placeholder="Some Eventual Search Feature Could Go Here" />
                <InputGroup.Append>
                  <InputGroup.Text>Search</InputGroup.Text>
                </InputGroup.Append>
              </InputGroup>
            </Col>
          </Form.Row>
        </Form>
            {localDisplay}
        </Col>
        <Col sm={3}>More Settings</Col>
      </Row>
    </Container>
    </div>
  )
}

export default ApplyContainer
