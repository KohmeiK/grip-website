import ProgressBar from 'react-bootstrap/ProgressBar'
import React, { useState, useContext, useReducer, useMemo } from 'react';
import { Button, Spinner } from "react-bootstrap"

import { Formik } from "formik";
import * as yup from "yup"
import { useDropzone } from 'react-dropzone'

import FirebaseContext from "../Firebase/"
import AuthContext from '../Firebase/AuthContext'

const baseStyle = {
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '20px',
  borderWidth: 2,
  borderRadius: 2,
  borderColor: '#eeeeee',
  borderStyle: 'dashed',
  backgroundColor: '#fafafa',
  color: '#bdbdbd',
  outline: 'none',
  transition: 'border .24s ease-in-out'
};

const activeStyle = {
  borderColor: '#2196f3'
};

const acceptStyle = {
  borderColor: '#00e676'
};

const rejectStyle = {
  borderColor: '#ff1744'
};

function Dropzone(props) {
  const { acceptedFiles, getRootProps, getInputProps, isDragActive, isDragAccept, isDragReject } = useDropzone({ accept: '.pdf' });
  const firebase = useContext(FirebaseContext)
  const setUploading = () => props.setUploading
  const setProgress = () => props.setProgress
  const [ignored, forceUpdate] = useReducer(x => x + 1, 0);

  const style = useMemo(() => ({
    ...baseStyle,
    ...(isDragActive ? activeStyle : {}),
    ...(isDragAccept ? acceptStyle : {}),
    ...(isDragReject ? rejectStyle : {})
  }), [
    isDragActive,
    isDragReject,
    isDragAccept
  ]);

  let files = acceptedFiles.map(file => (
    <li key={file.path}>
      {file.path} - {file.size} bytes
    </li>
  ));

  const handleSubmit = () => {
    let smallFile = false
    let resume = acceptedFiles[0]
    if (resume.size > 5 * 1024 * 1024) { // 5 MB limit
      alert('File is too large!')
      acceptedFiles.length = 0 // clear selected files
      forceUpdate()
      return
    } else {
      if (resume.size <= 256 * 1024) {
        smallFile = true
      }
    }

    acceptedFiles.length = 0 // clear selected files
    forceUpdate()

    let storageRef = firebase.storage
    let resumeRef = storageRef.child(props.uid + '.pdf')
    let uploadTask = resumeRef.put(resume)
    setUploading(true)
    uploadTask.on('state_changed', function (snapshot) {
      if (smallFile) { // automatically fills up the progress bar
        setProgress(100)
      } else { // regularly shows the progress
        let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        setProgress(progress)
      }
      smallFile = false
    }, function (error) {
      alert(error)
    }, function () {
      alert('Upload Successful')
    })
  }

  if (acceptedFiles.length > 1) { // limit to one file only
    files = <h5>Select one file only!</h5>
  }

  return (
    <div>
      <section className="container">
        <div {...getRootProps({ style })}>
          <input {...getInputProps()} />
          <p>Drag and drop your resume here, or click to select a file</p>
        </div>
        <aside>
          <h4>File</h4>
          <ul>{files}</ul>
        </aside>
        <Button onClick={handleSubmit} disabled={props.uploading || acceptedFiles.length !== 1}>Submit</Button>
      </section>
      <br />
      {props.uploading && <ProgressBar now={props.progress} />}
    </div>
  );
}

function UploadForm() {
  const [progress, setProgress] = useState(0) // for progress bar
  const [uploading, setUploading] = useState(false)
  const authContext = useContext(AuthContext)
  const uid = authContext.user.uid

  return (
    <div>
      <h3>Upload your resume here</h3>
      <Dropzone
        uid={uid}
        progress={progress}
        setProgress={setProgress}
        uploading={uploading}
        setUploading={setUploading}
      />
    </div>
  )
}


class UploadForm2 extends React.Component {
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
