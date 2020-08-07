import React from 'react'

import Tagline from './Tagline.js'
import How from './How.js'

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
