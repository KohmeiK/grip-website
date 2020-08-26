import React, { useState, useContext } from 'react'
import { useHistory } from "react-router-dom";
import { Button, Spinner } from "react-bootstrap"

import FirebaseContext from "../Firebase/"
import AuthContext from '../Firebase/AuthContext'
import useWindowDimensions from '../useWindowDimensions.js'

import Dropzone from './DropzoneFirst'

function FirstUpload() {
    const [progress, setProgress] = useState(0) // for progress bar
    const [uploading, setUploading] = useState(false)
    const [submitted, setSubmitted] = useState(false) // to determine whether the user can continue
    const [newUpload, setNewUpload] = useState(false) // ignore this, it's only for UploadForm
    const authContext = useContext(AuthContext)
    const uid = authContext.user.uid
    const history = useHistory()

    const { height, width } = useWindowDimensions();

    return (

        <Dropzone
            uid={uid}
            progress={progress}
            setProgress={setProgress}
            uploading={uploading}
            setUploading={setUploading}
            setSubmitted={setSubmitted}
            newUpload={newUpload}
            setNewUpload={setNewUpload}
        />
    )
}

export default FirstUpload
