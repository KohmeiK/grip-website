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
  return(
    <ul className={styles.nav}>
        <li className={styles.logo}>
            <img src={logo} alt="Logo"/>
            <p className={styles.asesText}>ASES</p>
            <p className={styles.abroadText}>Abroad</p>
        </li>
        <li>
            <LinkContainer to="/apply">
              <div className={styles.signIn}>Sign in</div>
            </LinkContainer>
        </li>
    </ul>
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
