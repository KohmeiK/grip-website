import React from 'react'
import { Nav, Navbar } from 'react-bootstrap'

function NavBar(props){
  return(
    <Navbar expand="lg" bg="dark" variant="dark">
      <Navbar.Brand href="#home" onClick={() => props.gotoPage(0)}>
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
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="#" onClick={() => props.gotoPage(0)}>Home</Nav.Link>
          <Nav.Link href="#" onClick={() => props.gotoPage(1)}>Upload</Nav.Link>
          <Nav.Link href="#" onClick={() => props.gotoPage(2)}>Create Company</Nav.Link>
          <Nav.Link href="#" onClick={() => props.gotoPage(3)}>Apply</Nav.Link>
          <Nav.Link href="#" onClick={() => props.gotoPage(4)}>Test420</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>

  );
}

export default NavBar
