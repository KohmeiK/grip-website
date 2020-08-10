import React from 'react'

import logo from '../Media/Logo.svg'

import styles from './Tagline.module.scss';

import { LinkContainer } from 'react-router-bootstrap'


// We listen to the resize event for IOS Vh update //this doesnt feel correct
window.addEventListener('resize', () => {
  // We execute the same script as before
  let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
});
/**
* First component in home. The whole home contaier is static
* So there is really nothing complicated.
*
*/
function Tagline(){

  let vh = window.innerHeight * 0.01;
  // Then we set the value in the --vh custom property to the root of the document
  document.documentElement.style.setProperty('--vh', `${vh}px`);
  return(
    <>
      <div className={styles.diagonalBox}>
        <div className={styles.content}>
            <div className={styles.heroImage}>
                <div className={styles.tagline}>
                    <h1>STANFORD'S GLOBALLY FOCUSED STUDENT ENTRIPRENEURSHIP</h1>
                    <p>Lorem ipsum dolor sit amet. cons adipiscing elit.</p>
                    <div className={styles.buttonWrap}>
                      <LinkContainer to="/apply">
                      <button className={styles.mainButton} type="button">
                        APPLY
                        </button>
                        </LinkContainer>
                    </div>
                </div>

            </div>
        </div>
      </div>
      <div className={`${styles.diagonalBox} ${styles.bgOne}`}>
        <div className={styles.arrow}>

        </div>
      </div>
    </>
  );
}

export default Tagline
