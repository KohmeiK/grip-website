import React from 'react'

import logo from '../Media/Logo.svg'
import background from '../Media/HeroIcon-mobile.svg'

import styles from './A_Tagline.module.scss';

function Tagline(){
  return(
    <>
      <div className={styles.diagonalBox}>
        <div className={styles.content}>
            <div className={styles.heroImage}>

                <ul className={styles.nav}>
                    <li className={styles.logo}>
                        <img src={logo} alt="Logo"/>
                        <p className={styles.asesText}>ASES</p>
                        <p className={styles.abroadText}>Abroad</p>
                    </li>
                    <li><div className={styles.signIn}>Sign in</div></li>
                </ul>

                <div className={styles.tagline}>
                    <h1>STANFORD'S GLOBALLY FOCUSED STUDENT ENTRIPRENEURSHIP</h1>
                    <p>Lorem ipsum dolor sit amet. cons adipiscing elit.</p>
                    <div className={styles.buttonWrap}>
                      <button className={styles.mainButton} type="button">
                        APPLY
                        </button>
                    </div>
                </div>

            </div>
        </div>
      </div>

      <div className={`${styles.diagonalBox} ${styles.bgOne}`}> </div>
    </>
  );
}

export default Tagline
