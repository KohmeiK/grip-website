import React, { useState, useContext } from 'react'
import { useHistory } from "react-router-dom";
import { Button, Spinner } from "react-bootstrap"

import FirebaseContext from "../Firebase/"
import AuthContext from '../Firebase/AuthContext'

import Dropzone from '../User/Dropzone'

function FirstUpload() {
    const [progress, setProgress] = useState(0) // for progress bar
    const [uploading, setUploading] = useState(false)
    const [submitted, setSubmitted] = useState(false) // to determine whether the user can continue
    const authContext = useContext(AuthContext)
    const uid = authContext.user.uid
    const history = useHistory()

    return (
        <div>
            <h3>Upload resume</h3>
            <p>You can choose to upload a default resume that will help you apply to jobs more quickly</p>
            <Dropzone
                uid={uid}
                progress={progress}
                setProgress={setProgress}
                uploading={uploading}
                setUploading={setUploading}
                setSubmitted={setSubmitted}
            />
            <Button disabled={!submitted} onClick={() => history.push('/apply')}>Continue</Button>
            <Button variant="Secondary" onClick={() => history.push('/apply')}>Skip for now</Button>
        </div>
    )
}

export default FirstUpload
