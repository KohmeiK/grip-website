import ProgressBar from 'react-bootstrap/ProgressBar'
import React, { useState, useContext, useEffect } from 'react'
import { Formik } from "formik";
import * as yup from "yup"

import FirebaseContext from "../Firebase/"
import AuthContext from '../Firebase/AuthContext'

import Dropzone from './Dropzone'

function UploadForm() {
  const [progress, setProgress] = useState(0) // for progress bar
  const [uploading, setUploading] = useState(false)
  const [newUpload, setNewUpload] = useState(false) 
  const [submitted, setSubmitted] = useState(false) // ignore this, this is just so firstUpload would work
  const [defResumeName, setDefResumeName] = useState('')
  const [timeSinceUpload, setTimeSinceUpload] = useState(null)
  const authContext = useContext(AuthContext)
  const firebase = useContext(FirebaseContext)
  const uid = authContext.user.uid

  function timeSince(date) {

    var seconds = Math.floor((new Date() - date) / 1000);
  
    var interval = seconds / 31536000;
  
    if (interval > 1) {
      return Math.floor(interval) + " years";
    }
    interval = seconds / 2592000;
    if (interval > 1) {
      return Math.floor(interval) + " months";
    }
    interval = seconds / 86400;
    if (interval > 1) {
      return Math.floor(interval) + " days";
    }
    interval = seconds / 3600;
    if (interval > 1) {
      return Math.floor(interval) + " hours";
    }
    interval = seconds / 60;
    if (interval > 1) {
      return Math.floor(interval) + " minutes";
    }
    return Math.floor(seconds) + " seconds";
  }

  useEffect(() => {
    firebase.db.collection('students').doc(uid).get().then(function(doc){
      if (doc.data().defResumeName){
        setDefResumeName(doc.data().defResumeName)
      } else {
        return
      }
      let lastUploadTime = doc.data().lastUploadTime
      setTimeSinceUpload(' — uploaded ' + timeSince(lastUploadTime) + ' ago')
    })
  }, [newUpload])

  return (
    <div>
      <h3>Upload your resume here</h3>
      <h5>Currently uploaded resume:</h5>
      {defResumeName
                    ? <div><i>{defResumeName}</i>{timeSinceUpload}</div>
                    : <i>You haven't uploaded any resume yet!</i>}
      <br/>
      <br/>
      <Dropzone
        uid={uid}
        progress={progress}
        setProgress={setProgress}
        uploading={uploading}
        setUploading={setUploading}
        newUpload={newUpload}
        setNewUpload={setNewUpload}
        setSubmitted={setSubmitted}
      />
    </div>
  )
}


class UploadForm2 extends React.Component { // old way of writing uploadForm
  constructor(props) {
    super(props)
    this.state = { progressBar: 0, uploading: false }

  }
  static contextType = FirebaseContext;
  render() {
    const that = this;
    let firebase = this.context;
    const user = firebase.auth.currentUser
    return (
      <div className="container">
        <Dropzone />
        <Formik
          initialValues={{ file: null }}
          onSubmit={(values, resetForm) => {
            alert(
              JSON.stringify(
                {
                  fileName: values.file.name,
                  type: values.file.type,
                  size: `${values.file.size} bytes`
                },
                null,
                2
              )
            );
            let smallFile = false
            let resume = values.file
            if (resume.size > 5 * 1024 * 1024) { // 5 MB limit
              alert("File is too large")
              resetForm()
            } else {
              if (resume.size <= 256 * 1024) {
                smallFile = true
              }
            }

            let storageRef = firebase.storage
            let resumeRef = storageRef.child(user.uid + '.pdf')
            let uploadTask = resumeRef.put(resume)
            that.setState({ uploading: true })
            uploadTask.on('state_changed', function (snapshot) {
              if (smallFile) { // automatically fills up the progress bar
                that.setState({ progressBar: 100 })
              } else { // regularly shows the progress
                let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                that.setState({ progressBar: progress })
              }
              smallFile = false
            }, function (error) {

            }, function () {
              alert('Upload Successful')
            })

          }
          }
          validationSchema={yup.object().shape({
            file: yup.mixed().required(),
          })}
          render={({ values, handleSubmit, setFieldValue }) => {
            return (
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="file">Resume Upload</label>
                  <input id="file" name="file" type="file" onChange={(event) => {
                    setFieldValue("file", event.currentTarget.files[0]);
                  }} className="form-control" />
                </div>
                {this.state.uploading && <ProgressBar now={this.state.progressBar} />}
                <br />
                {this.state.uploading
                  ? <button type="submit" className="btn btn-dark" disabled>Uploading</button>
                  : <button type="submit" className="btn btn-primary">Submit</button>}
              </form>
            );
          }} />
      </div>
    );
  }
};

export default UploadForm
