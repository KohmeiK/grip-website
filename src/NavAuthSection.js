import React, {useContext} from "react"
import { Nav, Navbar, Button, ButtonGroup, DropdownButton, Dropdown } from 'react-bootstrap'
import AuthContext from './Firebase/AuthContext'
import {useHistory} from "react-router-dom";
import FirebaseContext from './Firebase'
import { LinkContainer, UncontrolledDropdown, Image } from 'react-router-bootstrap'
import imgDIR from './user.png';

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
        <Button variant="light">
          <img src={imgDIR} width="30" height="30" />
        </Button>
          <DropdownButton as={ButtonGroup} variant= "secondary" id="bg-nested-dropdown" title={authContext.user.displayName + ' '}>
            <LinkContainer to="/setting">
              <Dropdown.Item>Settings</Dropdown.Item>
            </LinkContainer>
            <LinkContainer to="/upload">
              <Dropdown.Item>Upload Resume</Dropdown.Item>
            </LinkContainer>

            <Dropdown.Item onClick={()=>alert("Not set up yet!")}>Your Applications</Dropdown.Item>
            <Dropdown.Divider />

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
