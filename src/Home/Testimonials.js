import React from 'react'

import styles from './Testimonials.module.scss';
import face1 from '../Media/Face1.png'
import face2 from '../Media/Face2.png'
import face3 from '../Media/Face3.png'

import { LinkContainer } from 'react-router-bootstrap'


/**
* Testimonials parent component. Again, static and boring.
*
*/
function Testimonials(){
  return(
    <>
      <div className={`${styles.diagonalBox} ${styles.bgOne} ${styles.desktopTexture}`}>
      <div className={` ${styles.content}`}>
      <ul className={styles.quotes}>
        <li>
          <FaceAndQuote
            face={face1}
            quote="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco"
            name="John Smith"
          />
        </li>
        <li>
          <FaceAndQuote
            face={face2}
            quote="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."
            name="Daniel Smith"
          />
        </li>
        <li>
          <FaceAndQuote
            face={face3}
            quote="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. "
            name="Jane Smith"
          />
        </li>
      </ul>
      <LinkContainer to="/apply">
      <button className={`${styles.mainButton} ${styles.desktop}`} type="button">APPLY NOW</button>
      </LinkContainer>
      </div>
    </div>
    </>
  );
}

function FaceAndQuote(props){
  return(
    <div className={styles.quoteWrapper}>
      <img className={" "} src={props.face} alt="Person's Face"/>
      <p>{props.quote}</p>
      <h3 className={" "}>{props.name}</h3>
    </div>
  )
}

export default Testimonials
