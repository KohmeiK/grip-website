import React, {useContext} from 'react'
import { Nav, Navbar } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { useLocation } from 'react-router-dom'

import AuthContext from '../Firebase/AuthContext'

import NavAuthSection from './NavAuthSection'

/**
Navigation bar uses React-Bootsrap nav. Contains StudentNavLinks,
Company Nav Links, and Admin Nav Links, which hide and show depending on
the Auth Context. Nav Auth Section is the profile picutre and dropdown.
*/
function NavBar(props){
  const authContext = useContext(AuthContext)
  const location = useLocation();
  if(location.pathname === "/"){
    return null;
  }
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
          <StudentNavLinks isVisible={authContext.isAuthenticated}/>
          <CompanyNavLinks isVisible={authContext.isCompany}/>
          <AdminNavLinks isVisible={authContext.isAdmin}/>
        </Nav>
      </Navbar.Collapse>
      <Nav>
        <NavAuthSection />
      </Nav>
    </Navbar>

  );
}

function StudentNavLinks(props){
  return(props.isVisible ?
    <LinkContainer to="/apply">
        <Nav.Link>Apply (Job Search)</Nav.Link>
    </LinkContainer>:
  null)
}

function CompanyNavLinks(props){
  return(props.isVisible ?
    <LinkContainer to="/jobs">
      <Nav.Link>My Posted Jobs</Nav.Link>
    </LinkContainer>:
  null)
}

function AdminNavLinks(props){
  return(props.isVisible ?
    <><LinkContainer to="/create-company">
      <Nav.Link>Create Company</Nav.Link>
    </LinkContainer>
    <LinkContainer to="/admin">
      <Nav.Link>Admin Settings</Nav.Link>
    </LinkContainer></>:
  null)
}



export default NavBar
