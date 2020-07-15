import React from 'react'
import { Nav, Navbar } from 'react-bootstrap'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import { LinkContainer } from 'react-router-bootstrap'

function NavBar(props){
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
          <LinkContainer to="/upload">
            <Nav.Link>Upload</Nav.Link>
          </LinkContainer>
          <LinkContainer to="/company">
            <Nav.Link>Create Company</Nav.Link>
          </LinkContainer>
          <LinkContainer to="/apply">
            <Nav.Link>Apply</Nav.Link>
          </LinkContainer>
          <LinkContainer to="/login">
            <Nav.Link>Login</Nav.Link>
          </LinkContainer>
          <LinkContainer to="/signup">
            <Nav.Link>Signup</Nav.Link>
          </LinkContainer>
        </Nav>
      </Navbar.Collapse>
    </Navbar>

  );
}

export default NavBar
