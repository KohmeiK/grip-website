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
  const [downloaded, setDownloaded] = useState([])
  const [jobs, setJobs] = useState([]) //Data from DB
  const [display, setDisplay] = useState("Not Set") //JSX for List
  const [loading, setLoading] = useState(true); //Still loading array

  const getDate = () => {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    return mm + dd + yyyy
  }

  const deepCopyArray = (arr) => {
    let arrayHolder = []
    arr.forEach((element, index) => {
      arrayHolder[index] = element
    })
    return arrayHolder
  }

  const getStudentName = async (applicants) => {
    let names = []
    await Promise.all(applicants.map(async (applicant, index) => {
      await firebase.db.collection('students').doc(applicant).get().then(function(doc){
        names[index] = doc.data().displayName
      })
    }))
    return names
  }

  const updateUrls = async (resumeRefs) => {
    let urlsBuildingArray = []
    await Promise.all(resumeRefs.map(async (resumeRef, index) => {
      // await getUrl(resumeRef, index, urlsBuildingArray)
      let url = await firebase.storage.child(resumeRef).getDownloadURL()
      urlsBuildingArray[index] = url
    }))
    return urlsBuildingArray
  }

  const handleSecondClick = (index) => { // set loading to false when the user clicks download the second time 
    let downloadedBuilder = deepCopyArray(downloaded)
    downloadedBuilder[index] = false
    setDownloaded(downloadedBuilder)
  }

  const handleClick = async (index, jobTitle) => { //To downolad resumes
    const jobID = jobs[index].jobID
    let applicants = jobs[index].applicants
    let resumeRefs = applicants.map((applicant) => {
      return applicant + jobID + '.pdf'
    })

    //Delay for UI demo
    let promise = new Promise((res, rej) => {
      setTimeout(() => res("Now it's done!"), 2000)
    });
    let result = await promise;

    try {
      let zip = new JSZip();
      let count = 0;
      let zipFilename = jobTitle + ".zip";
      let urls = await updateUrls(resumeRefs)
      let names = await getStudentName(applicants)

      urls.forEach(function (url, indexForUrl) { // build a zip file containing all resumes
        let filename = names[indexForUrl] + ' - ' + jobTitle + ".pdf";
        // loading a file and add it in a zip file
        JSZipUtils.getBinaryContent(url, function (err, data) {
          if (err) {
            throw err; // or handle the error
          }
          zip.file(filename, data, { binary: true });
          count++;
          if (count == urls.length) {
            zip.generateAsync({ type: 'blob' }).then(function (content) {
              saveAs(content, zipFilename)
              let downloadedBuilder = deepCopyArray(downloaded)
              downloadedBuilder[index] = true
              setDownloaded(downloadedBuilder)
            });
          }
        });
      });
      let docRef = firebase.db.collection('jobs').doc(jobID)
      docRef.get().then(function (doc) {
        if (doc.data().downloaded === "") { // not downloaded yet
          let date = getDate()
          docRef.update({
            downloaded: date // add downloaded date
          })
        }
      })
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
        let downloadedBuilder = []
        querySnapshot.forEach(function (doc) {
          let job = doc.data()
          job.applicantNum = job.applicants.length //So this way the number of applicant is included
          job.jobID = doc.id //Similarly, include job's id
          jobsBuilder.push(job) //Add all jobs to array
          downloadedBuilder.push(false)
        })
        setJobs(jobsBuilder)
        setDownloaded(downloadedBuilder)
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
            handleSecondClick={handleSecondClick}
            applicantNum={job.applicantNum}
            loading={downloaded[index]}
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
