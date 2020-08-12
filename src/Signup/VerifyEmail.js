import React, { useContext, useState } from 'react'
import { Button, Spinner } from 'react-bootstrap'

import AuthContext from '../Firebase/AuthContext'

import FirebaseContext from '../Firebase/'

function VerifyEmail() {
    const authContext = useContext(AuthContext)
    const firebase = useContext(FirebaseContext)
    const [isSending, setSending] = useState(false)
    const [isSent, setSent] = useState(false)
    const handleVerEmail = async() => {
        setSending(true)
        try{
          await authContext.user.sendEmailVerification()
          setSending(false)
          setSent(true)
        }catch(err){
          alert(err)
        }
      }

    return (
        <div>
            <h3>Your account has been created. However, you need to verify your email to see this page.</h3>
            <br />
            <p>A verification email has been sent to the email address you provided, please click on the link before continuing.</p>
            <br />
            <p>If you haven't received the email after a few minutes, please click on the button below:</p>
            <Button
                disabled={authContext.isLoadingAuthState | isSending | authContext.isVerified}
                onClick={handleVerEmail}
                variant="success"
            >
                {isSending && <Spinner
                    as="span"
                    animation="border"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                />}
                {authContext.isVerified ? "Email Already Verified" : "Re-send Verification Email"}
            </Button>
        </div>
    )
}

export default VerifyEmail
