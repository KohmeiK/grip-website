import React, {useContext, useState} from "react"
import { Button } from 'react-bootstrap'
import AuthContext from './Firebase/AuthContext'
import FirebaseContext from './Firebase/'

function OtherSettings(){
  const authContext = useContext(AuthContext)
  const firebase = useContext(FirebaseContext)
  const [isSending, setSending] = useState(false)
  const [isSent, setSent] = useState(false)

  const handlePassReset = async() => {
    setSending(true)
    try{
      await firebase.auth.sendPasswordResetEmail(authContext.user.email)
      setSending(false)
      setSent(true)
    }catch(err){
      alert(err)
    }
  }
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
  if(authContext.isLoadingAuthSate){
    return(<div>Loading More Stuff...</div>)
  }else{
    return(
      <>
        <p>{isSent && `Email sent to ${authContext.user.email}. Please wait a few mintues before sending another one.`}</p>
        <Button disabled={authContext.isLoadingAuthState | isSending} onClick={handlePassReset} variant="success"> Send Password Reset Email </Button>
        <br/>
        <br/>
        <Button
          disabled={authContext.isLoadingAuthState | isSending | authContext.user.emailVerified}
          onClick={handleVerEmail}
          variant="success"
        >
          {authContext.user.emailVerified ? "Email Already Verified" : "Re-send Verification E-mail"}
        </Button>
      </>
    )
  }
}

export default OtherSettings
