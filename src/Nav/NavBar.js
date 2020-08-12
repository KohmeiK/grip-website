import React, {useContext, useState, useEffect} from 'react'
import { Nav, Navbar } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { useLocation } from 'react-router-dom'

import AuthContext from '../Firebase/AuthContext'
import NavAuthSection from './NavAuthSection'
import useWindowDimensions from '../useWindowDimensions.js'

import styles from './NavBar.module.scss';

import iconDoc from '../Media/iconDoc.svg';
import iconUser from '../Media/iconUser.svg';

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
  const toggleMobileNav = ()=>{
    setNavOpenStyle(!isNavOpenStyle);
  }
  const closeMobileNav = ()=>{
    setNavOpenStyle(false);
  }

  useEffect(() => {
    document.body.style.overflow = (isNavOpenStyle ? "hidden" : "initial")
  },[isNavOpenStyle]);

  if(width > 650){
    //Desktop both logged in and out
    return(
      <ul className={styles.nav}>
          <LinkContainer to="/">
          <li className={styles.logo}>
              <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 62 62">
                <g id="Logo" data-name="Group 1" transform="translate(-1037 -229)">
                  <path id="Subtraction_5" data-name="Subtraction 5" d="M31,62a31.5,31.5,0,0,1-3.17-.16A30.954,30.954,0,0,1,.16,34.17a31.465,31.465,0,0,1,0-6.339A30.943,30.943,0,0,1,8.506,9.669L13.034,14.2A24.6,24.6,0,0,0,47.8,48.966l4.528,4.528a31.043,31.043,0,0,1-9.264,6.07,30.826,30.826,0,0,1-8.9,2.276A31.5,31.5,0,0,1,31,62Zm22.494-9.669h0L48.966,47.8A24.6,24.6,0,0,0,14.2,13.034L9.669,8.506a31.042,31.042,0,0,1,9.264-6.07A30.826,30.826,0,0,1,27.83.16a31.465,31.465,0,0,1,6.339,0A30.954,30.954,0,0,1,61.84,27.83a31.466,31.466,0,0,1,0,6.339,30.943,30.943,0,0,1-8.346,18.161Z" transform="translate(1037 229)" fill="#233f71"/>
                  <path id="Subtraction_3" data-name="Subtraction 3" d="M22.5,45a22.666,22.666,0,0,1-4.535-.457A22.377,22.377,0,0,1,9.92,41.157a22.566,22.566,0,0,1-8.152-9.9A22.386,22.386,0,0,1,.457,27.035a22.719,22.719,0,0,1,0-9.069A22.377,22.377,0,0,1,3.843,9.92a22.566,22.566,0,0,1,9.9-8.152A22.386,22.386,0,0,1,17.965.457a22.719,22.719,0,0,1,9.069,0A22.377,22.377,0,0,1,35.08,3.843a22.566,22.566,0,0,1,8.152,9.9,22.387,22.387,0,0,1,1.311,4.223,22.719,22.719,0,0,1,0,9.069,22.376,22.376,0,0,1-3.386,8.045,22.566,22.566,0,0,1-9.9,8.152,22.387,22.387,0,0,1-4.223,1.311A22.666,22.666,0,0,1,22.5,45Zm0-42.955A20.455,20.455,0,1,0,42.955,22.5,20.478,20.478,0,0,0,22.5,2.045Z" transform="translate(1046 238)" fill="#233f71"/>
                </g>
              </svg>
              <p className={styles.asesText}>ASES</p>
              <p className={styles.abroadText}>Abroad</p>
          </li>
          </LinkContainer>
          <li>
          <ul className={`${styles.navOptions} ${isDarkText}`}>
              <StudentNavLinks isVisible={authContext.isAuthenticated}/>
              <CompanyNavLinks isVisible={authContext.isCompany && authContext.isAuthenticated}/>
              <AdminNavLinks isVisible={authContext.isAdmin && authContext.isAuthenticated}/>
              <NavAuthSection isWhiteText={isDarkText}/>
          </ul>
          </li>
      </ul>
    );
  }else if(!authContext.isLoadingAuthState && authContext.isAuthenticated){
    //Mobile, logged in
    return(
      <>
        <LinkContainer to="/">
        <div onClick={closeMobileNav}className={`${styles.logoAlt } ${isNavOpenStyle ?  styles.on : " "}`}>
            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 62 62">
              <g id="Logo" data-name="Group 1" transform="translate(-1037 -229)">
                <path id="Subtraction_5" data-name="Subtraction 5" d="M31,62a31.5,31.5,0,0,1-3.17-.16A30.954,30.954,0,0,1,.16,34.17a31.465,31.465,0,0,1,0-6.339A30.943,30.943,0,0,1,8.506,9.669L13.034,14.2A24.6,24.6,0,0,0,47.8,48.966l4.528,4.528a31.043,31.043,0,0,1-9.264,6.07,30.826,30.826,0,0,1-8.9,2.276A31.5,31.5,0,0,1,31,62Zm22.494-9.669h0L48.966,47.8A24.6,24.6,0,0,0,14.2,13.034L9.669,8.506a31.042,31.042,0,0,1,9.264-6.07A30.826,30.826,0,0,1,27.83.16a31.465,31.465,0,0,1,6.339,0A30.954,30.954,0,0,1,61.84,27.83a31.466,31.466,0,0,1,0,6.339,30.943,30.943,0,0,1-8.346,18.161Z" transform="translate(1037 229)" fill="#233f71"/>
                <path id="Subtraction_3" data-name="Subtraction 3" d="M22.5,45a22.666,22.666,0,0,1-4.535-.457A22.377,22.377,0,0,1,9.92,41.157a22.566,22.566,0,0,1-8.152-9.9A22.386,22.386,0,0,1,.457,27.035a22.719,22.719,0,0,1,0-9.069A22.377,22.377,0,0,1,3.843,9.92a22.566,22.566,0,0,1,9.9-8.152A22.386,22.386,0,0,1,17.965.457a22.719,22.719,0,0,1,9.069,0A22.377,22.377,0,0,1,35.08,3.843a22.566,22.566,0,0,1,8.152,9.9,22.387,22.387,0,0,1,1.311,4.223,22.719,22.719,0,0,1,0,9.069,22.376,22.376,0,0,1-3.386,8.045,22.566,22.566,0,0,1-9.9,8.152,22.387,22.387,0,0,1-4.223,1.311A22.666,22.666,0,0,1,22.5,45Zm0-42.955A20.455,20.455,0,1,0,42.955,22.5,20.478,20.478,0,0,0,22.5,2.045Z" transform="translate(1046 238)" fill="#233f71"/>
              </g>
            </svg>
            <p className={styles.asesText}>ASES</p>
            <p className={styles.abroadText}>Abroad</p>
        </div>
        </LinkContainer>
        <div onClick={toggleMobileNav} className={`${styles.menuSection } ${isNavOpenStyle ?  styles.on : " "}`}>
          <div className={`${styles.menuToggle } ${isNavOpenStyle ? styles.on : " "}`}>
            <div className={styles.one}></div>
            <div className={styles.two}></div>
            <div className={styles.three}></div>
          </div>
          <nav>
        		<ul className={`${styles.navOptionsMobile} ${!isNavOpenStyle ? styles.hidden : " "}`}>
              <div className={styles.profileName}>
                <svg id="Profile Icon" data-name="Component 38 – 1" xmlns="http://www.w3.org/2000/svg" width="51" height="51" viewBox="0 0 51 51">
                  <g id="_366-mj-7703-fon-jj" data-name="366-mj-7703-fon-jj" fill="#cb6a79">
                    <path d="M 25.5 50.5 C 22.12479972839355 50.5 18.850830078125 49.83906936645508 15.76902961730957 48.53557968139648 C 12.79209995269775 47.27645111083984 10.11845016479492 45.47378921508789 7.822329998016357 43.17766952514648 C 5.526209831237793 40.88154983520508 3.723550081253052 38.20790100097656 2.464420080184937 35.2309684753418 C 1.160930037498474 32.149169921875 0.5 28.87520027160645 0.5 25.5 C 0.5 22.12479972839355 1.160930037498474 18.850830078125 2.464420080184937 15.76902961730957 C 3.723550081253052 12.79209995269775 5.526209831237793 10.11845016479492 7.822329998016357 7.822329998016357 C 10.11845016479492 5.526209831237793 12.79209995269775 3.723550081253052 15.76902961730957 2.464420080184937 C 18.850830078125 1.160930037498474 22.12479972839355 0.5 25.5 0.5 C 28.87520027160645 0.5 32.149169921875 1.160930037498474 35.2309684753418 2.464420080184937 C 38.20790100097656 3.723550081253052 40.88154983520508 5.526209831237793 43.17766952514648 7.822329998016357 C 45.47378921508789 10.11845016479492 47.27645111083984 12.79209995269775 48.53557968139648 15.76902961730957 C 49.83906936645508 18.850830078125 50.5 22.12479972839355 50.5 25.5 C 50.5 28.87520027160645 49.83906936645508 32.149169921875 48.53557968139648 35.2309684753418 C 47.27645111083984 38.20790100097656 45.47378921508789 40.88154983520508 43.17766952514648 43.17766952514648 C 40.88154983520508 45.47378921508789 38.20790100097656 47.27645111083984 35.2309684753418 48.53557968139648 C 32.149169921875 49.83906936645508 28.87520027160645 50.5 25.5 50.5 Z" stroke="none"/>
                    <path d="M 25.5 1 C 22.19207954406738 1 18.98363876342773 1.647640228271484 15.96379852294922 2.924919128417969 C 13.04647827148438 4.158840179443359 10.42623901367188 5.925521850585938 8.175880432128906 8.175880432128906 C 5.925521850585938 10.42623901367188 4.158840179443359 13.04647827148438 2.924919128417969 15.96379852294922 C 1.647640228271484 18.98363876342773 1 22.19207954406738 1 25.5 C 1 28.80792045593262 1.647640228271484 32.016357421875 2.924919128417969 35.03620147705078 C 4.158840179443359 37.95352172851562 5.925521850585938 40.57376098632812 8.175880432128906 42.82411956787109 C 10.42623901367188 45.07447814941406 13.04647827148438 46.84115982055664 15.96379852294922 48.07508087158203 C 18.98363876342773 49.35235977172852 22.19207954406738 50 25.5 50 C 28.80792045593262 50 32.016357421875 49.35235977172852 35.03620147705078 48.07508087158203 C 37.95352172851562 46.84115982055664 40.57376098632812 45.07447814941406 42.82411956787109 42.82411956787109 C 45.07447814941406 40.57376098632812 46.84115982055664 37.95352172851562 48.07508087158203 35.03620147705078 C 49.35235977172852 32.016357421875 50 28.80792045593262 50 25.5 C 50 22.19207954406738 49.35235977172852 18.98363876342773 48.07508087158203 15.96379852294922 C 46.84115982055664 13.04647827148438 45.07447814941406 10.42623901367188 42.82411956787109 8.175880432128906 C 40.57376098632812 5.925521850585938 37.95352172851562 4.158840179443359 35.03620147705078 2.924919128417969 C 32.016357421875 1.647640228271484 28.80792045593262 1 25.5 1 M 25.5 0 C 39.58325958251953 0 51 11.41674041748047 51 25.5 C 51 39.58325958251953 39.58325958251953 51 25.5 51 C 11.41674041748047 51 0 39.58325958251953 0 25.5 C 0 11.41674041748047 11.41674041748047 0 25.5 0 Z" stroke="none" fill="#fff"/>
                  </g>
                  <text id="K" transform="translate(15 36)" fill="#fff" font-size="30" font-family="LucidaGrande, Lucida Grande"><tspan x="0" y="0">{authContext.user.displayName.charAt(0)}</tspan></text>
                </svg>
                <div>{authContext.user.displayName}</div>
              </div>
        			<StudentNavLinks isVisible={authContext.isAuthenticated}/>
              <MyApplicationLinks isVisible={!authContext.isCompany && authContext.isAuthenticated && !authContext.isAdmin} />
              <CompanyNavLinks isVisible={authContext.isCompany && authContext.isAuthenticated}/>
              <AdminNavLinks isVisible={authContext.isAdmin && authContext.isAuthenticated}/>
              <hr className={styles.divider} />
              <NavAuthSection isMobile={true}/>
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
                <g id="Logo" data-name="Group 1" transform="translate(-1037 -229)">
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
      <li>
        <img src={iconDoc} />
        <a>Apply</a>
      </li>
    </LinkContainer>:
  null)
}

function MyApplicationLinks(props){
  return(props.isVisible ?
    <LinkContainer to="/applications">
      <li>
        <img src={iconUser} />
        <a>My Applications</a>
      </li>
    </LinkContainer>:
  null)
}

function CompanyNavLinks(props){
  return(props.isVisible ?
    <LinkContainer to="/jobs">
    <li>
      <img src={iconUser} />
      <a>My Posted Jobs</a>
    </li>
    </LinkContainer>:
  null)
}

function AdminNavLinks(props){
  return(props.isVisible ?
    <><LinkContainer to="/create-company">
      <li><img src={iconUser} /><a>Create Company</a></li>
    </LinkContainer>
    <LinkContainer to="/admin">
      <li><img src={iconUser} /><a>Admin Settings</a></li>
    </LinkContainer></>:
  null)
}



export default NavBar
