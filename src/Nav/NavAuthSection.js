import React, {useContext, useState, useRef, useEffect} from "react"
import { Button, ButtonGroup, DropdownButton, Dropdown } from 'react-bootstrap'
import {useHistory} from "react-router-dom";
import { LinkContainer } from 'react-router-bootstrap'

import FirebaseContext from '../Firebase'
import AuthContext from '../Firebase/AuthContext'

import styles from './NavAuthSection.module.scss'

import iconGear from '../Media/iconGear.svg';
import iconDoor from '../Media/iconDoor.svg';
import iconUser from '../Media/iconUser.svg';
import iconGearDark from '../Media/iconGearDark.svg';
import iconDoorDark from '../Media/iconDoorDark.svg';
import iconUserDark from '../Media/iconUserDark.svg';

/**
Handles display of the log in button OR profile picutre, which
has the dropdown optons of (My Info) (My Applications) (Logout)
*/
function NavAuthSection(props){
  const [showDropdown, setDropdown] = useState(false)
  const firebase = useContext(FirebaseContext)
  const authContext = useContext(AuthContext)
  let history = useHistory()

  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef, setDropdown);

  const logOut = ()=>{
      setDropdown(false)
      firebase.auth.signOut()
      history.push('/')
  }

  let noCompanyOptions =
  (<>
    <LinkContainer to="/applications">
    <li onClick={()=>setDropdown(false)}> <img src={iconUserDark}/> <p>My Applications</p> </li>
    </LinkContainer>
    <hr className={styles.divider} />
  </>)
  if(!authContext.isLoadingAuthState && !authContext.isAdmin && authContext.isCompany){
    noCompanyOptions = " "
  }

  if(authContext.isLoadingAuthState){
    return(
      "Loading..."
    )
  }else if(props.isMobile){
    return(
      <>
      <LinkContainer to="/editInfo/basic">
        <li>
          <img src={iconGear} />
          <a>Settings</a>
        </li>
      </LinkContainer>
      <li onClick={logOut}>
        <img src={iconDoor} />
        <a>Log Out</a>
      </li>
      </>
    )
  }else if(authContext.isAuthenticated && authContext.user){
    return(
      <div ref={wrapperRef}>
      <li className={`${!showDropdown && styles.noBG} ${styles.expandDiv}`}>
        <div className={styles.profileIcon} onClick={()=>setDropdown(!showDropdown)}>
          <svg id="Profile Icon" data-name="Component 38 – 1" xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 51 51">
            <g id="_366-mj-7703-fon-jj" data-name="366-mj-7703-fon-jj" fill="#cb6a79">
              <path d="M 25.5 50.5 C 22.12479972839355 50.5 18.850830078125 49.83906936645508 15.76902961730957 48.53557968139648 C 12.79209995269775 47.27645111083984 10.11845016479492 45.47378921508789 7.822329998016357 43.17766952514648 C 5.526209831237793 40.88154983520508 3.723550081253052 38.20790100097656 2.464420080184937 35.2309684753418 C 1.160930037498474 32.149169921875 0.5 28.87520027160645 0.5 25.5 C 0.5 22.12479972839355 1.160930037498474 18.850830078125 2.464420080184937 15.76902961730957 C 3.723550081253052 12.79209995269775 5.526209831237793 10.11845016479492 7.822329998016357 7.822329998016357 C 10.11845016479492 5.526209831237793 12.79209995269775 3.723550081253052 15.76902961730957 2.464420080184937 C 18.850830078125 1.160930037498474 22.12479972839355 0.5 25.5 0.5 C 28.87520027160645 0.5 32.149169921875 1.160930037498474 35.2309684753418 2.464420080184937 C 38.20790100097656 3.723550081253052 40.88154983520508 5.526209831237793 43.17766952514648 7.822329998016357 C 45.47378921508789 10.11845016479492 47.27645111083984 12.79209995269775 48.53557968139648 15.76902961730957 C 49.83906936645508 18.850830078125 50.5 22.12479972839355 50.5 25.5 C 50.5 28.87520027160645 49.83906936645508 32.149169921875 48.53557968139648 35.2309684753418 C 47.27645111083984 38.20790100097656 45.47378921508789 40.88154983520508 43.17766952514648 43.17766952514648 C 40.88154983520508 45.47378921508789 38.20790100097656 47.27645111083984 35.2309684753418 48.53557968139648 C 32.149169921875 49.83906936645508 28.87520027160645 50.5 25.5 50.5 Z" stroke="none"/>
              <path d="M 25.5 1 C 22.19207954406738 1 18.98363876342773 1.647640228271484 15.96379852294922 2.924919128417969 C 13.04647827148438 4.158840179443359 10.42623901367188 5.925521850585938 8.175880432128906 8.175880432128906 C 5.925521850585938 10.42623901367188 4.158840179443359 13.04647827148438 2.924919128417969 15.96379852294922 C 1.647640228271484 18.98363876342773 1 22.19207954406738 1 25.5 C 1 28.80792045593262 1.647640228271484 32.016357421875 2.924919128417969 35.03620147705078 C 4.158840179443359 37.95352172851562 5.925521850585938 40.57376098632812 8.175880432128906 42.82411956787109 C 10.42623901367188 45.07447814941406 13.04647827148438 46.84115982055664 15.96379852294922 48.07508087158203 C 18.98363876342773 49.35235977172852 22.19207954406738 50 25.5 50 C 28.80792045593262 50 32.016357421875 49.35235977172852 35.03620147705078 48.07508087158203 C 37.95352172851562 46.84115982055664 40.57376098632812 45.07447814941406 42.82411956787109 42.82411956787109 C 45.07447814941406 40.57376098632812 46.84115982055664 37.95352172851562 48.07508087158203 35.03620147705078 C 49.35235977172852 32.016357421875 50 28.80792045593262 50 25.5 C 50 22.19207954406738 49.35235977172852 18.98363876342773 48.07508087158203 15.96379852294922 C 46.84115982055664 13.04647827148438 45.07447814941406 10.42623901367188 42.82411956787109 8.175880432128906 C 40.57376098632812 5.925521850585938 37.95352172851562 4.158840179443359 35.03620147705078 2.924919128417969 C 32.016357421875 1.647640228271484 28.80792045593262 1 25.5 1 M 25.5 0 C 39.58325958251953 0 51 11.41674041748047 51 25.5 C 51 39.58325958251953 39.58325958251953 51 25.5 51 C 11.41674041748047 51 0 39.58325958251953 0 25.5 C 0 11.41674041748047 11.41674041748047 0 25.5 0 Z" stroke="none" fill="#fff"/>
            </g>
            <text id="K" transform="translate(15 36)" fill="#fff" font-size="30" font-family="LucidaGrande, Lucida Grande"><tspan x="0" y="0">{authContext.user.displayName == null ? '?' : authContext.user.displayName.charAt(0)}</tspan></text>
          </svg>
        </div>

        <ul className={`${!showDropdown && styles.hidden} ${styles.dropdown}`}>
          {noCompanyOptions}
          <LinkContainer to="/editInfo/basic">
            <li onClick={()=>setDropdown(false)}> <img src={iconGearDark}/> <p>Settings</p> </li>
          </LinkContainer>
          <li onClick={logOut}> <img src={iconDoorDark}/> <p>Log Out</p> </li>
        </ul>
      </li>
      </div>
    )
  }else{
    return(
      <LinkContainer to="/login">
        <li><a>Log In</a></li>
      </LinkContainer>
    )
  }


}



export default NavAuthSection

/**
 * Hook that alerts clicks outside of the passed ref
 */
function useOutsideAlerter(ref, setDropdown) {
    useEffect(() => {
        /**
         * If clicked on outside of element
         */
        function handleClickOutside(event) {
            if (ref.current && !ref.current.contains(event.target)) {
                setDropdown(false);
            }
        }

        // Bind the event listener
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            // Unbind the event listener on clean up
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [ref]);
}
