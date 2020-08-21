import React, { useState, useContext, useEffect } from 'react'
import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'

import FirebaseContext from '../Firebase'
import AuthContext from '../Firebase/AuthContext'

import JobCardForStudent from './JobCardForStudent'

/**
 * More info here
 */
function Applications() {
    const firebase = useContext(FirebaseContext)
    const authContext = useContext(AuthContext)
    const [jobs, setJobs] = useState([]) //Data from DB
    const [loading, setLoading] = useState(true); //Still loading array

    /**
     * Insert text at cursor position.
     *
     * @param {string} text
     * @public
     */
    const updateJobs = async (jobIDs) => {
        let jobsBuildingArray = []
        await Promise.all(jobIDs.map(async (jobID, index) => {
            let jobRef = firebase.db.collection('jobs').doc(jobID)
            await getJob(jobRef, index, jobsBuildingArray)
        }))

        setJobs(jobsBuildingArray)
        setLoading(false)
    }

    const getJob = async (jobRef, index, outputArray) => {
        let doc = await jobRef.get()
        // jobs.push(doc.data())
        // setJobs(jobs.concat(doc.data()))
        outputArray[index] = doc.data()
        return ""
    }

    useEffect(() => {
        //Only on mount
        let jobIDs = []
        firebase.db.collection('applications').where("studentID", "==", authContext.user.uid).get().then(function(applications){
            applications.forEach(application => {
                jobIDs.push(application.data().jobID)
            })
        }).then(function(){
            if (jobIDs.length === 0){
                alert("You haven't applied to any jobs") 
                // localDisplay = <h3>You haven't applied to any jobs!</h3>
            } else {
                updateJobs(jobIDs)
            }
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    let localDisplay = "Loading..."
    if (!loading) {
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
