import React, {useContext} from "react"
import { Nav, Navbar, Button, ButtonGroup, DropdownButton, Dropdown } from 'react-bootstrap'
import AuthContext from './Firebase/AuthContext'
import {useHistory} from "react-router-dom";
import FirebaseContext from './Firebase'

function NavAuthSection(){
  const firebase = useContext(FirebaseContext)
  const authContext = useContext(AuthContext)
  let history = useHistory()

  const handleAuthChange = ()=>{
    if(authContext.authenticated){
      firebase.auth.signOut()
      history.push('/')
    }else{
      history.push('/login')
    }
  }

  if(authContext.loadingAuthSate){
    return(
      "Loading..."
    )
  }else if(authContext.authenticated && authContext.user){
    return(
      <>
        <DropdownButton variant= "secondary" id="dropdown-basic-button" title={authContext.user.displayName}>
          <Dropdown.Item href="/setting">Settings</Dropdown.Item>
          <Dropdown.Item href="/upload">Upload Resume</Dropdown.Item>
          <Dropdown.Item onClick={()=>alert("Not set up yet!")}>Your Applications</Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Item onClick={handleAuthChange}>Log Out</Dropdown.Item>
        </DropdownButton>
      </>
    )
  }else{
    return(
      <Button onClick={handleAuthChange}>Log In</Button>
    )
  }


}



export default NavAuthSection
