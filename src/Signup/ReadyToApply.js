import React, { useContext, useState } from 'react'
import { Button, Spinner } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'
import Skeleton from 'react-loading-skeleton';
import { LinkContainer } from 'react-router-bootstrap'

import AuthContext from '../Firebase/AuthContext'

import styles from './ReadyToApply.module.scss'
import rocketLogo from '../Media/greyRocket.svg'

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
            <img src={rocketLogo}/>
            <h5>Step 4 of 4:</h5> {/*//Desktop only*/}
            <h3>Apply</h3> {/*//Desktop only*/}
            <h6>You're ready to apply!</h6>
            <LinkContainer to="apply">
              <button className={styles.mainButton}>Look for jobs</button>
            </LinkContainer>
        </div>
      </div>
    )
}

export default VerifyEmail
