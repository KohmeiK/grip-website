import React, { useState, useContext, useEffect } from 'react'
import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import { CardColumns, Form, InputGroup, FormControl } from 'react-bootstrap'
import * as JSZip from 'jszip'
import * as JSZipUtils from 'jszip-utils'
import { saveAs } from 'save-as'
import JobCard from './JobCard'
import FirebaseContext from '../Firebase'
import AuthContext from '../Firebase/AuthContext'

function MyJobs() {
  const firebase = useContext(FirebaseContext)
  const authContext = useContext(AuthContext)
  const [btnUrl, setBtnUrl] = useState(null)
  const [jobs, setJobs] = useState([]) //Data from DB
  const [display, setDisplay] = useState("Not Set") //JSX for List
  const [loading, setLoading] = useState(true); //Still loading array

  const updateUrls = async (resumeRefs) => {
    let urlsBuildingArray = []
    await Promise.all(resumeRefs.map(async (resumeRef, index) => {
      // await getUrl(resumeRef, index, urlsBuildingArray)
      let url = await firebase.storage.child(resumeRef).getDownloadURL()
      urlsBuildingArray[index] = url
    }))
    return urlsBuildingArray
  }

  const getApplicantNames = async(applicants) => {
    
  }

  // const getUrl = async(resumeRef, index, outputArray) => {
  //   let url = await firebase.storage.child(resumeRef).getDownloadURL()
  //   outputArray[index] = url
  //   return("")
  // }
  const handleClick = async (index, jobTitle) => { //To downolad resumes
    // console.log(jobs[index], "Job Doccuement")
    const jobID = jobs[index].jobID
    // console.log(jobID, "Job ID")
    let applicants = jobs[index].applicants
    let resumeRefs = applicants.map((applicant) => {
      return applicant + jobID + '.pdf'
    })
    // console.log(resumesRef, "Mapped pdf names")

    //Delay for UI demo
    let promise = new Promise((res, rej) => {
      setTimeout(() => res("Now it's done!"), 5000)
    });
    let result = await promise;

    try {
      // const url = await firebase.storage.child(resumeRefs[0]).getDownloadURL();
      //Temp -> Get url for PDF 1
      // `url` is the download URL for resume
      var zip = new JSZip();
      var count = 0;
      var zipFilename = jobTitle + ".zip";
      var urls = await updateUrls(resumeRefs)

      urls.forEach(function (url, index) {
        index++
        var filename = jobTitle + ' ' + index + ".pdf";
        // loading a file and add it in a zip file
        JSZipUtils.getBinaryContent(url, function (err, data) {
          if (err) {
            throw err; // or handle the error
          }
          zip.file(filename, data, { binary: true });
          count++;
          if (count == urls.length) {
            zip.generateAsync({ type: 'blob' }).then(function (content) {
              saveAs(content, zipFilename);
              console.log('reached')
            });
          }
        });
      });

      // console.log(url, "Storage Url")
      // setBtnUrl(url) //wait the url from firestore and set it to state
    }
    catch (err) {
      alert(err.message)
    }
  }

  useEffect(async () => {
    //Only on mount
    try {
      let querySnapshot = await firebase.db.collection('jobs').where("companyID", "==", authContext.user.uid).get()
      if (querySnapshot.docs.length === 0) {
        setJobs("No Jobs");
      } else {
        let jobsBuilder = []
        querySnapshot.forEach(function (doc) {
          let job = doc.data()
          job.applicantNum = job.applicants.length //So this way the number of applicant is included
          job.jobID = doc.id //Similarly, include job's id
          jobsBuilder.push(job) //Add all jobs to array
        })
        setJobs(jobsBuilder)
      }
      setLoading(false)
    } catch (error) {
      alert(error)
    }
  }, [])

  let localDisplay = "Loading..."
  if (!loading) {
    if (jobs === "No Jobs") {
      localDisplay = <h3> You have no posted jobs! </h3>
    } else {
      localDisplay = jobs.map((job, index) => { //Convert each element to JSX
        //convert all elements before reach render, this is only updates when show is changed
        return (
          <JobCard
            key={index}
            index={index}
            title={job.title}
            info={job.info}
            dl={job.deadline}
            handleClick={handleClick}
            applicantNum={job.applicantNum}
            loading={(btnUrl != null)}
            url={btnUrl} //send button url to jobcard
          />
        );
      })
    }
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
