import React, {useContext} from "react"
import { Button, ButtonGroup, DropdownButton, Dropdown } from 'react-bootstrap'
import {useHistory} from "react-router-dom";
import { LinkContainer } from 'react-router-bootstrap'

import imgDIR from '../Media/user.png';
import FirebaseContext from '../Firebase'
import AuthContext from '../Firebase/AuthContext'

function NavAuthSection(){
  const firebase = useContext(FirebaseContext)
  const authContext = useContext(AuthContext)
  let history = useHistory()

  const handleAuthChange = ()=>{
    if(authContext.isAuthenticated){
      firebase.auth.signOut()
      history.push('/')
    }else{
      history.push('/login')
    }
  }

  if(authContext.isLoadingAuthState){
    return(
      "Loading..."
    )
  }else if(authContext.isAuthenticated && authContext.user){
    return(
      <>
      <ButtonGroup aria-label="Basic example">
        <Button disabled variant=
          {authContext.isAdmin ? authContext.isCompany ? "warning" : "danger ": authContext.isCompany ? "primary" : "light"}
        >
          <img src={imgDIR} width="30" height="30" alt="profile pic"/>
        </Button>
          <DropdownButton as={ButtonGroup} variant= "light" id="bg-nested-dropdown" title={authContext.user.displayName + ' '}>
            <LinkContainer to="/setting">
              <Dropdown.Item>Settings</Dropdown.Item>
            </LinkContainer>
            <LinkContainer to="/upload">
              <Dropdown.Item>Upload Resume</Dropdown.Item>
            </LinkContainer>
            <LinkContainer to="/applications">
              <Dropdown.Item>Your Applications</Dropdown.Item>
            </LinkContainer>



            <Dropdown.Item onClick={handleAuthChange}>Log Out</Dropdown.Item>
          </DropdownButton>
        </ButtonGroup>
      </>
    )
  }else{
    return(
      <Button onClick={handleAuthChange}>Log In</Button>
    )
  }


}



export default NavAuthSection
