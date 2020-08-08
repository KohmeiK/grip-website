import ProgressBar from 'react-bootstrap/ProgressBar'
import React, { useState, useContext, useReducer, useMemo } from 'react';
import { Button, Spinner } from "react-bootstrap"

import { Formik } from "formik";
import * as yup from "yup"
import { useDropzone } from 'react-dropzone'

import FirebaseContext from "../Firebase/"

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

export default Dropzone