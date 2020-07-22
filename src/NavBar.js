import React, {useContext} from 'react'
import { Nav, Navbar, Button, ButtonGroup, DropdownButton, Dropdown } from 'react-bootstrap'
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
import NavAuthSection from './NavAuthSection'


function NavBar(props){
  const firebase = useContext(FirebaseContext)
  const authContext = useContext(AuthContext)
  let history = useHistory()

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
          <RestOfNavBar isLoggedIn={authContext.isAuthenticated}/>
        </Nav>
      </Navbar.Collapse>
      <Nav>
        <NavAuthSection />
      </Nav>
    </Navbar>

  );
}

function RestOfNavBar(props){
  if(props.isLoggedIn){
    return(
      <> {/*Fragments - aren't they cool?*/}
        <LinkContainer to="/company">
          <Nav.Link>Create Company</Nav.Link>
        </LinkContainer>
        <LinkContainer to="/apply">
          <Nav.Link>Apply (Comp)</Nav.Link>
        </LinkContainer>
        <LinkContainer to="/test">
          <Nav.Link>Apply (Job)</Nav.Link>
        </LinkContainer>
        <LinkContainer to="/admin">
          <Nav.Link>Super Secret</Nav.Link>
        </LinkContainer>
      </>
    );
  }
  return(null)
}

export default NavBar
