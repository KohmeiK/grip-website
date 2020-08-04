import React from 'react'

import Tagline from './A_Tagline.js'
import How from './B_How.js'

import styles from './HomeContainer.module.scss';

function HomeContainer(){
  return(
    <div className={styles.body}>
      <Tagline />
      <How />
    </div>
  );
}

export default HomeContainer
