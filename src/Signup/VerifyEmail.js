import React, { useContext, useState } from 'react'
import { Button, Spinner } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'
import Skeleton from 'react-loading-skeleton';
import { LinkContainer } from 'react-router-bootstrap'

import AuthContext from '../Firebase/AuthContext'

import styles from './VerifyEmail.module.scss'
import sheildLogo from '../Media/Step2.svg'

function VerifyEmail() {
    const authContext = useContext(AuthContext)
    const [isSending, setSending] = useState(false)
    const [isSent, setSent] = useState(false)
    const history = useHistory()
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

    if (!authContext.isLoadingAuthState && !authContext.isAuthenticated){
        alert("Not logged in, going to login")
        history.push('/login')
    }

    return (
      <div className={styles.mainWrapper}>
        <div className={styles.infoWrapper}>
            <img src={sheildLogo}/>
            <h5>Step 2 of 4:</h5>
            <h3>Verify email</h3>
            <h6>A verification email has been sent to:</h6>
            <div>{authContext.isLoadingAuthState || !authContext.isAuthenticated ? <Skeleton width={150} height={20}/> : authContext.user.email}</div>
            <LinkContainer to="changeEmail"><button className={styles.subButton}>Change (Fix) Email</button></LinkContainer>
            <p>Please click on the link before continuing. If you have not received an email in a few minutes, please click on the button below.</p>
            {authContext.isLoadingAuthState ? <Skeleton width={310} height={40}/> :
            <button
                className={styles.subButton}
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
                {authContext.isVerified ? "Your email is verified, should you be on this page?" : "re-send verification email"}
            </button>}
        </div>
      </div>
    )
}

export default VerifyEmail
