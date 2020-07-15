import React, {useContext} from 'react'
import { Nav, Navbar, Button, ButtonGroup } from 'react-bootstrap'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useHistory,
} from "react-router-dom";
import { LinkContainer } from 'react-router-bootstrap'
import AuthContext from './Firebase/AuthContext'
import FirebaseContext from './Firebase'


function NavBar(props){
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

  let authStatus = "Loading Page"
  if(authContext.loadingAuthSate){
    authStatus = "Loading Auth"
  }else if(authContext.authenticated && authContext.user){
    authStatus = authContext.user.displayName ? authContext.user.displayName : authContext.user.email
  }else{
    authStatus = "Logged out"
  }

  console.log(authContext.user)
  return(
    <Navbar expand="lg" bg="dark" variant="dark">
      <LinkContainer to="/">
        <Navbar.Brand href="#home">
          <img
          src="https://ases.stanford.edu/images/logo.png"
          width="45"
          height="30"
          className="d-inline-block align-top"
          alt="Stanford Logo"
          style={{paddingRight:"15px"}}
          />
          Stanford ASES
        </Navbar.Brand>
      </LinkContainer>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <LinkContainer to="/">
            <Nav.Link>Home</Nav.Link>
          </LinkContainer>
          <RestOfNavBar isLoggedIn={authContext.authenticated}/>
        </Nav>
      </Navbar.Collapse>
      <Nav>
        <ButtonGroup>
          <Button variant="secondary" disabled>{authStatus}</Button>
          <Button onClick={handleAuthChange}>{authContext.authenticated ? "Log Out" : "Log In"}</Button>
        </ButtonGroup>
      </Nav>
    </Navbar>

  );
}

function RestOfNavBar(props){
  if(props.isLoggedIn){
    return(
      <> {/*Fragments - aren't they cool?*/}
        <LinkContainer to="/upload">
          <Nav.Link>Upload</Nav.Link>
        </LinkContainer>
        <LinkContainer to="/company">
          <Nav.Link>Create Company</Nav.Link>
        </LinkContainer>
        <LinkContainer to="/apply">
          <Nav.Link>Apply</Nav.Link>
        </LinkContainer>
      </>
    );
  }
  return(null)
}

export default NavBar
