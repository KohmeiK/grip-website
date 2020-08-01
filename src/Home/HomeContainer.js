import React from 'react'

import styles from './HomeContainer.module.css'; // Import css modules stylesheet as styles

function HomeContainer(){
  return(
    <div className={styles.tagline}>
      <h1>Bussiness Beyond the Bay</h1>
      <h5>A subtitle for this main title, more selling points</h5>
      <button className={styles.mainButton} type="button">Apply</button>
    </div>
  );
}

export default HomeContainer
