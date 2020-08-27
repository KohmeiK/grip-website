import React from 'react'

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
      <div className={`${styles.diagonalBox}`}>
        <div className={styles.content}>
            <div className={styles.heroImage}>
                <div className={styles.tagline}>
                    <h1>(FIX) STANFORD'S GLOBALLY FOCUSED STUDENT ENTREPRENEURSHIP CLUB</h1>
                    <p>Applying abroad has never been easier</p>
                    <LinkContainer to="/apply">
                    <div className={styles.buttonWrap}>
                      <button className={styles.mainButton} type="button">
                        APPLY
                        </button>
                    </div>
                    </LinkContainer>
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
