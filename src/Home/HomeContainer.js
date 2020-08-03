import React from 'react'

import logo from '../Media/Logo.svg'
import styles from './HomeContainer.module.scss'; // Import css modules stylesheet as styles
import background from '../Media/HeroIcon-mobile.svg'

function HomeContainer(){
  return(
    <div className={styles.body}>
      <div className={styles.diagonalBox}>
        <div className={styles.content}>
            <div className={styles.heroImage}>

                <ul className={styles.nav}>
                    <li className={styles.logo}>
                        <img src={logo} alt="Logo"/>
                        <p><b>Abroad</b></p>
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

      <div className={`${styles.diagonalBox} ${styles.bgOne}`}>
      </div>
      <div className={`${styles.diagonalBox} ${styles.bgTwo}`}>
        <div className={styles.content}>
        </div>
      </div>

    </div>
  );
}

export default HomeContainer
