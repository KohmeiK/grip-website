import ProgressBar from 'react-bootstrap/ProgressBar'
import React, { useState, useContext, useReducer, useMemo, useEffect, useCallback} from 'react';
import { Button, Spinner } from "react-bootstrap"

import { Formik } from "formik";
import * as yup from "yup"
import { useDropzone } from 'react-dropzone'

import styles from './DropzoneFirst.module.scss'
import FirebaseContext from "../Firebase/"
import cloudIcon from '../Media/cloudIcon.svg'
import docIcon from '../Media/iconDocDark.svg'

function Dropzone(props) {
    const onDrop = useCallback(acceptedFiles => {
      // Do something with the files
    }, [])
    const { acceptedFiles, getRootProps, getInputProps, isDragActive, isDragAccept, isDragReject } = useDropzone({ accept: '.pdf' });
    const firebase = useContext(FirebaseContext)
    const setUploading = (newValue) => props.setUploading(newValue)
    const setProgress = (newValue) => props.setProgress(newValue)
    const setNewUpload = (newValue) => props.setNewUpload(newValue)
    const setSubmitted = (newValue) => props.setSubmitted(newValue)

    const [styleString, setStyleString] = useState(styles.baseStyle)
    const [ignored, forceUpdate] = useReducer(x => x + 1, 0);

    useEffect(() => {
      setStyleString(`${styles.baseStyle} ${isDragActive && styles.activeStyle} ${isDragReject && styles.rejectStyle} ${isDragAccept && styles.acceptStyle}`)
    },[
        isDragActive,
        isDragReject,
        isDragAccept
    ]);

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

        setUploading(true)

        firebase.db.collection("students").doc(props.uid).update({ // write it student's db
            lastUploadTime: new Date().getTime(),
            defResumeName: resume.name
        })

        let storageRef = firebase.storage
        let resumeRef = storageRef.child(props.uid + '.pdf')
        let uploadTask = resumeRef.put(resume)

        uploadTask.on('state_changed', function (snapshot) {
            if (smallFile) { // automatically fills up the progress bar
                setProgress(100)
            } else { // regularly shows the progress
                let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                setProgress(progress)
            }
        }, function (error) {
            alert(error)
        }, function () {
            smallFile = false
            setUploading(false)
            setProgress(0) // reset things so the user can submit again
            setNewUpload(!props.newUpload) // only for UploadForm, so the new resume is displayed
            setSubmitted(true) // only for FirstUpload, so the user can continue
            alert('Upload Successful')
        })
    }

    let displayName;
    if (acceptedFiles.length == 1){
      displayName = acceptedFiles[0].path;
    }
    else if (acceptedFiles.length > 1) { // limit to one file only
        displayName = "Select one file only!"
    }else{
      displayName = "No file selcted"
    }
    // console.log(files)

    return (
      <>
      <div {...getRootProps()} className={styleString} >
        <input multiple={false} {...getInputProps({multiple: false})}/>
        <div className={styles.inputWrapper}>
          <div className={styles.leftCol}>
              <h5> Step 3 of 4:</h5>
              <h3> Upload Resume</h3>
              {
                isDragActive ?
                  <p>Drop the file here ...</p> :
                  <p>Drag 'n' drop your resume here, or click anywhere to select files</p>
              }
          </div>
          <div className={styles.rightCol}>
            <img src={cloudIcon}/>
            <hr />
            <h6> OR </h6>
            <button> Choose file</button>
            <div className={styles.fileLabel}> <img src={docIcon}/> <div>{displayName} </div></div>
            <div className={styles.progressWrap}>
              {props.uploading && <><ProgressBar now={props.progress} /><p>{props.progress}%</p></>}
            </div>
          </div>
        </div>
      </div>
      <div className={styles.footer}>
        <button className={styles.mainButton}onClick={handleSubmit} disabled={props.uploading || acceptedFiles.length !== 1}>Upload Resume</button>
        <button className={styles.subButton}> Upload later </button>
      </div>
      </>
    )
}

export default Dropzone
