import React from 'react'

import styles from './B_About.module.scss';

function Tagline(){
  return(
    <div className={`${styles.diagonalBox} ${styles.bgOne}`}>
      <div className={styles.content}>
        <br/> <br/><br/> <br/> <br/><br/><br/><br/><br/><br/><br/><br/>
        <h2> The rest of the page will try to get you to sign up...</h2>
      </div>
    </div>
  );
}

export default Tagline
