import React from 'react'

import styles from './How.module.scss';

import how1m from '../Media/How1.svg';
import how2m from '../Media/How2.svg';
import how3m from '../Media/How3.svg';
import how1d from '../Media/How1d.svg';
import how2d from '../Media/How2d.svg';
import how3d from '../Media/How3d.svg';

import arrow from '../Media/RightArrow.svg'

function How(){
  return(
    <>
      <div className={`${styles.diagonalBox} ${styles.desktopTexture}`}>
      <div className={styles.textWrapper}>
        <div className={`${styles.diagonalBox} ${styles.bgOne}`}> </div>
        <div className={`${styles.diagonalBox} ${styles.bgTwo}`}>
          <div className={`${styles.content} ${styles.topText}`}>
            <h1>How it Works</h1>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
          </div>
        </div>
      </div>
      <ul className={styles.steps}>

        <li>
          <div className={`${styles.diagonalBox}`}>
            <div className={`${styles.content} ${styles.step}`}>
              <img className={styles.desktop} src={how1d} alt="Step1"/>
              <h3 className={styles.desktop}>Sign up</h3>
              <h3 className={styles.mobile}>Step 1: Sign up</h3>
              <img className={styles.mobile} src={how1m} alt="Step1"/>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor</p>
            </div>
          </div>
        </li>
        <img className={styles.desktop} src={arrow} alt="Right Arrow"/>
        <li>
          <div className={`${styles.diagonalBox} ${styles.bgThree}`}>
            <div className={`${styles.content} ${styles.step}`}>
              <img className={styles.desktop} src={how2d} alt="Step2"/>
              <h3 className={styles.desktop}>Upload resume</h3>
              <h3 className={styles.mobile}>Step 2: Upload resume</h3>
              <img className={styles.mobile} src={how2m} alt="Step2"/>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor</p>
            </div>
          </div>
        </li>
        <img className={styles.desktop} src={arrow} alt="Right Arrow"/>
        <li>
          <div className={`${styles.diagonalBox}`}>
            <div className={`${styles.content} ${styles.step}`}>
              <img className={styles.desktop} src={how3d} alt="Step3"/>
              <h3 className={styles.desktop}>Apply</h3>
              <h3 className={styles.mobile}>Step 3: Apply</h3>
              <img className={styles.mobile} src={how3m} alt="Step3"/>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor</p>
            </div>
          </div>
        </li>
      </ul>
      <button className={`${styles.mainButton} ${styles.desktop}`} type="button">APPLY</button>
    </div>
    <div className={`${styles.diagonalBox} ${styles.bgFour}`}> </div>
    </>
  );
}

export default How
