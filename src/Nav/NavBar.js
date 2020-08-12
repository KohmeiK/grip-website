import React, {useContext, useState} from 'react'
import { Nav, Navbar } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { useLocation } from 'react-router-dom'

import AuthContext from '../Firebase/AuthContext'
import NavAuthSection from './NavAuthSection'
import useWindowDimensions from '../useWindowDimensions.js'

import styles from './NavBar.module.scss';

/**
Navigation bar uses React-Bootsrap nav. Contains StudentNavLinks,
Company Nav Links, and Admin Nav Links, which hide and show depending on
the Auth Context. Nav Auth Section is the profile picutre and dropdown.
*/
function NavBar(props){
  const authContext = useContext(AuthContext)
  // console.log(authContext.isVerified, "emailVerfied?")
  let location = useLocation();
  let isDarkText = null;
  const { height, width } = useWindowDimensions();
  if(shouldTextBeWhite(location.pathname, width)){
    isDarkText = styles.brightText;
  }else{
    isDarkText = styles.darkText;
  }
  const [isNavOpenStyle, setNavOpenStyle] = useState(false)
  const handleNavToggle = ()=>{
    setNavOpenStyle(!isNavOpenStyle);
  }
  console.log(isNavOpenStyle, "open")
  if(width > 650){
    //Desktop both cases
    return(
      <ul className={styles.nav}>
          <LinkContainer to="/">
          <li className={styles.logo}>
              <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 62 62">
                <g id="Group_1" data-name="Group 1" transform="translate(-1037 -229)">
                  <path id="Subtraction_5" data-name="Subtraction 5" d="M31,62a31.5,31.5,0,0,1-3.17-.16A30.954,30.954,0,0,1,.16,34.17a31.465,31.465,0,0,1,0-6.339A30.943,30.943,0,0,1,8.506,9.669L13.034,14.2A24.6,24.6,0,0,0,47.8,48.966l4.528,4.528a31.043,31.043,0,0,1-9.264,6.07,30.826,30.826,0,0,1-8.9,2.276A31.5,31.5,0,0,1,31,62Zm22.494-9.669h0L48.966,47.8A24.6,24.6,0,0,0,14.2,13.034L9.669,8.506a31.042,31.042,0,0,1,9.264-6.07A30.826,30.826,0,0,1,27.83.16a31.465,31.465,0,0,1,6.339,0A30.954,30.954,0,0,1,61.84,27.83a31.466,31.466,0,0,1,0,6.339,30.943,30.943,0,0,1-8.346,18.161Z" transform="translate(1037 229)" fill="#233f71"/>
                  <path id="Subtraction_3" data-name="Subtraction 3" d="M22.5,45a22.666,22.666,0,0,1-4.535-.457A22.377,22.377,0,0,1,9.92,41.157a22.566,22.566,0,0,1-8.152-9.9A22.386,22.386,0,0,1,.457,27.035a22.719,22.719,0,0,1,0-9.069A22.377,22.377,0,0,1,3.843,9.92a22.566,22.566,0,0,1,9.9-8.152A22.386,22.386,0,0,1,17.965.457a22.719,22.719,0,0,1,9.069,0A22.377,22.377,0,0,1,35.08,3.843a22.566,22.566,0,0,1,8.152,9.9,22.387,22.387,0,0,1,1.311,4.223,22.719,22.719,0,0,1,0,9.069,22.376,22.376,0,0,1-3.386,8.045,22.566,22.566,0,0,1-9.9,8.152,22.387,22.387,0,0,1-4.223,1.311A22.666,22.666,0,0,1,22.5,45Zm0-42.955A20.455,20.455,0,1,0,42.955,22.5,20.478,20.478,0,0,0,22.5,2.045Z" transform="translate(1046 238)" fill="#233f71"/>
                </g>
              </svg>
              <p className={styles.asesText}>ASES</p>
              <p className={styles.abroadText}>Abroad</p>
          </li>
          </LinkContainer>
          <li className={`${styles.navOptions} ${isDarkText}`}>
              <StudentNavLinks isVisible={authContext.isAuthenticated}/>
              <CompanyNavLinks isVisible={authContext.isCompany && authContext.isAuthenticated}/>
              <AdminNavLinks isVisible={authContext.isAdmin && authContext.isAuthenticated}/>
              <NavAuthSection />
          </li>
      </ul>
    );
  }else if(!authContext.isLoadingAuthState && authContext.isAuthenticated){
    //Mobile, logged in
    return(
      <>
        <LinkContainer to="/">
        <div className={`${styles.logoAlt } ${isNavOpenStyle ?  styles.on : " "}`}>
            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 62 62">
              <g id="Group_1" data-name="Group 1" transform="translate(-1037 -229)">
                <path id="Subtraction_5" data-name="Subtraction 5" d="M31,62a31.5,31.5,0,0,1-3.17-.16A30.954,30.954,0,0,1,.16,34.17a31.465,31.465,0,0,1,0-6.339A30.943,30.943,0,0,1,8.506,9.669L13.034,14.2A24.6,24.6,0,0,0,47.8,48.966l4.528,4.528a31.043,31.043,0,0,1-9.264,6.07,30.826,30.826,0,0,1-8.9,2.276A31.5,31.5,0,0,1,31,62Zm22.494-9.669h0L48.966,47.8A24.6,24.6,0,0,0,14.2,13.034L9.669,8.506a31.042,31.042,0,0,1,9.264-6.07A30.826,30.826,0,0,1,27.83.16a31.465,31.465,0,0,1,6.339,0A30.954,30.954,0,0,1,61.84,27.83a31.466,31.466,0,0,1,0,6.339,30.943,30.943,0,0,1-8.346,18.161Z" transform="translate(1037 229)" fill="#233f71"/>
                <path id="Subtraction_3" data-name="Subtraction 3" d="M22.5,45a22.666,22.666,0,0,1-4.535-.457A22.377,22.377,0,0,1,9.92,41.157a22.566,22.566,0,0,1-8.152-9.9A22.386,22.386,0,0,1,.457,27.035a22.719,22.719,0,0,1,0-9.069A22.377,22.377,0,0,1,3.843,9.92a22.566,22.566,0,0,1,9.9-8.152A22.386,22.386,0,0,1,17.965.457a22.719,22.719,0,0,1,9.069,0A22.377,22.377,0,0,1,35.08,3.843a22.566,22.566,0,0,1,8.152,9.9,22.387,22.387,0,0,1,1.311,4.223,22.719,22.719,0,0,1,0,9.069,22.376,22.376,0,0,1-3.386,8.045,22.566,22.566,0,0,1-9.9,8.152,22.387,22.387,0,0,1-4.223,1.311A22.666,22.666,0,0,1,22.5,45Zm0-42.955A20.455,20.455,0,1,0,42.955,22.5,20.478,20.478,0,0,0,22.5,2.045Z" transform="translate(1046 238)" fill="#233f71"/>
              </g>
            </svg>
            <p className={styles.asesText}>ASES</p>
            <p className={styles.abroadText}>Abroad</p>
        </div>
        </LinkContainer>
        <div className={`${styles.menuSection } ${isNavOpenStyle ?  styles.on : " "}`}>
          <div className={`${styles.menuToggle } ${isNavOpenStyle ? styles.on : " "}`} onClick={handleNavToggle}>
            <div className={styles.one}></div>
            <div className={styles.two}></div>
            <div className={styles.three}></div>
          </div>
          <nav>
        		<ul className={`${styles.navOptionsMobile} ${!isNavOpenStyle ? styles.hidden : " "}`}>
        			<li><StudentNavLinks isVisible={authContext.isAuthenticated}/></li>
        			<li><CompanyNavLinks isVisible={authContext.isCompany && authContext.isAuthenticated}/></li>
        			<li><AdminNavLinks isVisible={authContext.isAdmin && authContext.isAuthenticated}/></li>
        		</ul>
        	</nav>
        </div>
      </>
    );
  }else{
    //Mobile NOT logged in
    return(
      <ul className={styles.nav}>
          <LinkContainer to="/">
          <li className={styles.logo}>
              <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 62 62">
                <g id="Group_1" data-name="Group 1" transform="translate(-1037 -229)">
                  <path id="Subtraction_5" data-name="Subtraction 5" d="M31,62a31.5,31.5,0,0,1-3.17-.16A30.954,30.954,0,0,1,.16,34.17a31.465,31.465,0,0,1,0-6.339A30.943,30.943,0,0,1,8.506,9.669L13.034,14.2A24.6,24.6,0,0,0,47.8,48.966l4.528,4.528a31.043,31.043,0,0,1-9.264,6.07,30.826,30.826,0,0,1-8.9,2.276A31.5,31.5,0,0,1,31,62Zm22.494-9.669h0L48.966,47.8A24.6,24.6,0,0,0,14.2,13.034L9.669,8.506a31.042,31.042,0,0,1,9.264-6.07A30.826,30.826,0,0,1,27.83.16a31.465,31.465,0,0,1,6.339,0A30.954,30.954,0,0,1,61.84,27.83a31.466,31.466,0,0,1,0,6.339,30.943,30.943,0,0,1-8.346,18.161Z" transform="translate(1037 229)" fill="#233f71"/>
                  <path id="Subtraction_3" data-name="Subtraction 3" d="M22.5,45a22.666,22.666,0,0,1-4.535-.457A22.377,22.377,0,0,1,9.92,41.157a22.566,22.566,0,0,1-8.152-9.9A22.386,22.386,0,0,1,.457,27.035a22.719,22.719,0,0,1,0-9.069A22.377,22.377,0,0,1,3.843,9.92a22.566,22.566,0,0,1,9.9-8.152A22.386,22.386,0,0,1,17.965.457a22.719,22.719,0,0,1,9.069,0A22.377,22.377,0,0,1,35.08,3.843a22.566,22.566,0,0,1,8.152,9.9,22.387,22.387,0,0,1,1.311,4.223,22.719,22.719,0,0,1,0,9.069,22.376,22.376,0,0,1-3.386,8.045,22.566,22.566,0,0,1-9.9,8.152,22.387,22.387,0,0,1-4.223,1.311A22.666,22.666,0,0,1,22.5,45Zm0-42.955A20.455,20.455,0,1,0,42.955,22.5,20.478,20.478,0,0,0,22.5,2.045Z" transform="translate(1046 238)" fill="#233f71"/>
                </g>
              </svg>
              <p className={styles.asesText}>ASES</p>
              <p className={styles.abroadText}>Abroad</p>
          </li>
          </LinkContainer>
          <LinkContainer to="/login">
            <li className={`${styles.navOptions}`}>
              <a>Log In</a>
            </li>
          </LinkContainer>
      </ul>
    );
  }

}

function shouldTextBeWhite(location, width){
  return(location == "/" && width > 650)
}

function StudentNavLinks(props){
  return(props.isVisible ?
    <LinkContainer to="/apply">
        <a>Apply</a>
    </LinkContainer>:
  null)
}

function CompanyNavLinks(props){
  return(props.isVisible ?
    <LinkContainer to="/jobs">
      <a>My Posted Jobs</a>
    </LinkContainer>:
  null)
}

function AdminNavLinks(props){
  return(props.isVisible ?
    <><LinkContainer to="/create-company">
      <a>Create Company</a>
    </LinkContainer>
    <LinkContainer to="/admin">
      <a>Admin Settings</a>
    </LinkContainer></>:
  null)
}



export default NavBar
