import React, { useState, useContext, useEffect } from 'react'
import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import { Form, InputGroup, FormControl, Button } from 'react-bootstrap'
import moment from 'moment'
import 'react-dates/initialize';
import { DateRangePicker } from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';

import FirebaseContext from '../Firebase'
import AuthContext from '../Firebase/AuthContext'

import JobContainer from './JobContainer'

function ApplyContainer() {
  const firebase = useContext(FirebaseContext)
  const authContext = useContext(AuthContext)
  const [jobs, setJobs] = useState([]) //Data from DB
  // const [indexToShow, setIndexToShow] = useState(-1); //Modal
  // const [show, setShow] = useState(false); //Modal show
  const [loading, setLoading] = useState(true); //Still loading array
  const [filters, setFilters] = useState([])
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [focusedInput, setFocusedInput] = useState(null)
  // const handleClose = () => setShow(false);
  // const handleShow = (index) => {
  //   setIndexToShow(index)
  //   setShow(true)
  // }

  const deepCopyArray = (arr) => {
    let arrayHolder = []
    arr.forEach((element, index) => {
      arrayHolder[index] = element
    })
    return arrayHolder
  }

  function timeUntil(date) {

    var days = Math.floor((date - new Date()) / 1000 / 86400);

    return days
  }

  function timeSince(date) {

    var days = Math.ceil((new Date() - date) / 1000 / 86400);

    return days
  }

  useEffect(() => {
    //Only on mount
    const loadContent = async () => {
      let applicationsRef = await firebase.db.collection('applications').where("studentID", "==", authContext.user.uid).get()
      let jobsApplied = []
      applicationsRef.forEach(applicationRef => {
        jobsApplied.push(applicationRef.data().jobID)
      })
      console.log('applied', jobsApplied)
      firebase.db.collection('jobs')
        .get()
        .then(function (querySnapshot) { // no condition for query, thus returns all jobs
          if (querySnapshot.docs.length === 0) {
            return (<h1> Oops, there are currently no available internships! </h1>)
          }
          let jobsBuilder = []
          querySnapshot.forEach(function (doc) {
            let job = doc.data()
            job.jobID = doc.id // so this way job's document id is included
            job.applied = jobsApplied.includes(job.jobID)
            setJobs(jobsBuilder.push(job)) //Add all jobs to array
          })
          console.log(jobsBuilder)
          setJobs(jobsBuilder)
          setLoading(false)
        }).catch(function (error) {
          console.log(error)
        })
    }

    loadContent() // useEffect(async()...) is bad practice so do this instead
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  let localDisplay = "Loading..."
  if (!loading) {
    let jobsClone = deepCopyArray(jobs)
    filters.forEach(filter => {
      switch (filter) {
        case 'region1':
          jobsClone = jobsClone.filter(job => job.regionForSearch === 'region1')
          break;
        case 'region2':
          jobsClone = jobsClone.filter(job => job.regionForSearch === 'region2')
          break;
        case 'region3':
          jobsClone = jobsClone.filter(job => job.regionForSearch === 'region3')
          break;
        case 'date':
          jobsClone = jobsClone.filter(job => {
            if (job.duration === 'Flexible Duration'){
              return true
            }
            let [start, end] = job.duration.split('-')
            start = moment(start)
            end = moment(end)
            console.log('start', start.format())
            console.log('startDate', startDate.format())
            return start.isBetween(startDate, endDate) || end.isBetween(startDate, endDate) || startDate.isBetween(start, end) || endDate.isBetween(start, end)
          })
          break;
        case 'deadline':
          jobsClone = jobsClone.filter(job => {
            let localDL = moment(job.deadline).valueOf() // unix time in local time zone
            return timeUntil(localDL) >= 0 && timeUntil(localDL) <= 3
          })
          break;
        case 'posted':
          jobsClone = jobsClone.filter(job => timeSince(job.timePosted) <= 7 && timeSince(job.timePosted) > 0)
          break;
        case 'resume':
          jobsClone = jobsClone.filter(job => !job.reqCoverLetter)
          break;
        default:
          console.log('error')
      }
    })
    localDisplay = jobsClone.map(function (job, index) { //Convert each element to JSX
      //convert all elements before reach render, this is only updates when show is changed
      return (
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
            timePosted={job.timePosted}
            applied={job.applied}
            // handleClose={handleClose}
            // handleShow={handleShow}
            // show={show && (index === indexToShow) ? true : false}
            isCompany={authContext.isCompany && !authContext.isAdmin}
            studentName={authContext.user.displayName}
            studentID={authContext.user.uid}
          />
        </div>
      );
    })
  }


  return (
    <div style={{ background: "#e0e0e0", paddingTop: "85px" }} >
      <Container fluid style={{ paddingTop: "2em" }}>
        <Row>
          <Col>
            <div style={{ marginLeft: "1em", borderRadius: "25px", background: "white", height: "40em" }}>
              <div style={{ margin: "2em", marginTop: "0em", background: "white", height: "40em" }}>
                <h4>Advanced Search</h4>
                <label htmlFor="region">Region:</label>
                <Form id="region">
                  <Form.Check
                    type={'checkbox'}
                    id={'region1'}
                    label={'Region 1'}
                    checked={filters.includes('region1')}
                    onChange={filters.includes('region1') ? () => {
                      setFilters(filters.filter(filter => filter !== 'region1'))
                    } : () => {
                      setFilters(filters.concat('region1'))
                    }}
                  />
                  <Form.Check
                    type={'checkbox'}
                    id={'region2'}
                    label={'Region 2'}
                    checked={filters.includes('region2')}
                    onChange={filters.includes('region2') ? () => {
                      setFilters(filters.filter(filter => filter !== 'region2'))
                    } : () => {
                      setFilters(filters.concat('region2'))
                    }}
                  />
                  <Form.Check
                    type={'checkbox'}
                    id={'region3'}
                    label={'Region 3'}
                    checked={filters.includes('region3')}
                    onChange={filters.includes('region3') ? () => {
                      setFilters(filters.filter(filter => filter !== 'region3'))
                    } : () => {
                      setFilters(filters.concat('region3'))
                    }}
                  />
                </Form>
                <label>Date:</label>
                <DateRangePicker
                  startDate={startDate} // momentPropTypes.momentObj or null,
                  startDateId="your_unique_start_date_id" // PropTypes.string.isRequired,
                  endDate={endDate} // momentPropTypes.momentObj or null,
                  endDateId="your_unique_end_date_id" // PropTypes.string.isRequired,
                  onDatesChange={({ startDate, endDate }) => {
                    setStartDate(startDate)
                    setEndDate(endDate)
                    if (startDate && endDate){
                      if (!filters.includes('date')){
                        setFilters(filters.concat('date'))
                      }
                    } else {
                      if (filters.includes('date')){
                        setFilters(filters.filter(filter => filter !== 'date'))
                      }
                    }
                  }} // PropTypes.func.isRequired,
                  focusedInput={focusedInput} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
                  onFocusChange={focusedInput => setFocusedInput(focusedInput)} // PropTypes.func.isRequired,
                />
                <Button onClick={() => {
                  setStartDate(null)
                  setEndDate(null)
                  if (filters.includes('date')){
                    setFilters(filters.filter(filter => filter !== 'date'))
                  }
                }}>Clear</Button> <br/>
                <label htmlFor="others">Others:</label>
                <Form id="others">
                  <Form.Check
                    type={'checkbox'}
                    id={'deadline'}
                    label={'Deadline within 3 days'}
                    checked={filters.includes('deadline')}
                    onChange={filters.includes('deadline') ? () => {
                      setFilters(filters.filter(filter => filter !== 'deadline'))
                    } : () => {
                      setFilters(filters.concat('deadline'))
                    }}
                  />
                  <Form.Check
                    type={'checkbox'}
                    id={'posted'}
                    label={'Posted within a week'}
                    checked={filters.includes('posted')}
                    onChange={filters.includes('posted') ? () => {
                      setFilters(filters.filter(filter => filter !== 'posted'))
                    } : () => {
                      setFilters(filters.concat('posted'))
                    }}
                  />
                  <Form.Check
                    type={'checkbox'}
                    id={'resume'}
                    label={'Only resume required'}
                    checked={filters.includes('resume')}
                    onChange={filters.includes('resume') ? () => {
                      setFilters(filters.filter(filter => filter !== 'resume'))
                    } : () => {
                      setFilters(filters.concat('resume'))
                    }}
                  />
                </Form>
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
