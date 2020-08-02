import React, { useState, useContext, useEffect } from 'react'
import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import JobCardForStudent from './JobCardForStudent'
import { CardColumns, Form, InputGroup, FormControl } from 'react-bootstrap'

import FirebaseContext from '../Firebase'
import AuthContext from '../Firebase/AuthContext'

//
function Applications() {
    const firebase = useContext(FirebaseContext)
    const authContext = useContext(AuthContext)
    const [jobs, setJobs] = useState([]) //Data from DB
    const [display, setDisplay] = useState("Not Set") //JSX for List
    const [loading, setLoading] = useState(true); //Still loading array
    const handleClick = async (index) => { //To downolad resumes
    }
    const updateJobs = async (doc) => {
        console.log('jobs1', jobs)
        let jobsBuildingArray = []
        let jobIDs = doc.data().jobsAppliedTo
        await Promise.all(jobIDs.map(async (jobID, index) => {
            console.log(jobID, index, "Calling getJob(JobID, Index, refernce to empty array)")
            let jobRef = firebase.db.collection('jobs').doc(jobID)
            await getJob(jobRef, index, jobsBuildingArray)
        }))

        setJobs(jobsBuildingArray)
        console.log(jobsBuildingArray, "builder is done")
        console.log('when loading is set to false - ', jobs)
        setLoading(false)
    }
    const getJob = async (jobRef, index, outputArray) => {
        let doc = await jobRef.get()
        // jobs.push(doc.data())
        // setJobs(jobs.concat(doc.data()))
        console.log('jobs2', jobs) //Nothing will show here since setJobs is aysnc
        outputArray[index] = doc.data()
        return("Ethan - You must return something to a promise (when you await soemthing)")
    }

    useEffect(() => {
        //Only on mount
        console.log('jobs0', jobs)
        let studentRef = firebase.db.collection('students').doc(authContext.user.uid)
        studentRef.get().then(function (doc) {
            if(doc.data().jobsAppliedTo == null){
              alert("You do not have a jobsAppliedTo array. Aborting updateJobs")
            } else if(doc.data().jobsAppliedTo.length == 0){
              alert("You have not applied to any jobs! Aborting updateJobs")
            }else{
              updateJobs(doc)
            }
        }).catch(function (error) {
            console.log(error)
        })
    }, [])

    let localDisplay = "Loading..."
    if (!loading) {
        console.log('jobs3', jobs)
        localDisplay = jobs.map((job, index) => { //Convert each element to JSX
            //convert all elements before reach render, this is only updates when show is changed
            return (
                <JobCardForStudent
                    key={index}
                    index={index}
                    title={job.title}
                    companyName={job.companyName}
                    dl={job.deadline}
                />
            );
        })
    }

    return (
        <div style={{ background: "#e0e0e0" }}>
            <h1>A student page where you can see your applications</h1>
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

export default Applications
