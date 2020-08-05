import React from 'react'

import styles from './B_How.module.scss';

import how1 from '../Media/How1.svg';
import how2 from '../Media/How2.svg';
import how3 from '../Media/How3.svg';

function How(){
  return(
    <>
    <div className={`${styles.diagonalBox} ${styles.bgOne}`}>
    </div>
    <div className={`${styles.diagonalBox} ${styles.bgTwo}`}>
      <div className={`${styles.content} ${styles.topText}`}>
        <h1>How it Works</h1>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
      </div>
    </div>
    <ul className={styles.steps}>

      <li>
        <div className={`${styles.diagonalBox}`}>
          <div className={`${styles.content} ${styles.step}`}>
            <h3>Step 1: Sign up</h3>
            <img src={how1} alt="Step1"/>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor</p>
          </div>
        </div>
      </li>

      <li>
        <div className={`${styles.diagonalBox} ${styles.bgThree}`}>
          <div className={`${styles.content} ${styles.step}`}>
            <h3>Step 2: Upload resume</h3>
            <img src={how2} alt="Step2"/>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor</p>
          </div>
        </div>
      </li>

      <li>
        <div className={`${styles.diagonalBox}`}>
          <div className={`${styles.content} ${styles.step}`}>
            <h3>Step 3: Apply</h3>
            <img src={how3} alt="Step3"/>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor</p>
          </div>
        </div>
      </li>
    </ul>

    <div className={`${styles.diagonalBox} ${styles.bgFour}`}> </div>
    </>
  );
}

export default How
