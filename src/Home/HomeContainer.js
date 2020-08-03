import React from 'react'

import Tagline from './A_Tagline.js'
import About from './B_About.js'

import styles from './HomeContainer.module.scss';

function HomeContainer(){
  return(
    <div className={styles.body}>
      <Tagline />
      <About />
    </div>
  );
}

export default HomeContainer
