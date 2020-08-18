import styles from './Footer.module.scss';

import React from 'react'

import arrow from '../Media/UpArrow.svg'
import logo1 from '../Media/Logo1.svg'
import logo2 from '../Media/Logo2.svg'
import logo3 from '../Media/Logo3.svg'
import logo4 from '../Media/Logo4.svg'


const handleClick = () => {
  alert("Sorry, we don't have this ready yet.")
}

const scrollTop = () =>{
   window.scrollTo({top: 0, behavior: 'smooth'});
};

/**
* This is just a static section that for the About / Mission Statement section.
* Couple werid diagonalBox things going on as usual
*/
function Footer(){
  return(
  <>
  <div className={`${styles.bgOne} ${styles.diagonalBox}`}>
    <div className={`${styles.content} ${styles.toTopBtn}`}>
      <button onClick={scrollTop}>
        <img src={arrow} alt="Arrow Pointing up"/>
        <p>Back to top</p>
      </button>
    </div>
  </div>
  <div className={`${styles.bgTwo} ${styles.diagonalBox}`}>
    <div className={`${styles.footerWrapper} ${styles.content}`}>
      <div className={styles.desktopFlex}>
        <div className={styles.links}>
          <a href="http://tiny.cc/lyeosz"><img src={logo1} alt="Arrow Pointing up"/></a>
          <img onClick={handleClick} src={logo2} alt="Arrow Pointing up"/>
          <img onClick={handleClick} src={logo3} alt="Arrow Pointing up"/>
          <img onClick={handleClick} src={logo4} alt="Arrow Pointing up"/>
        </div>
        <div className={styles.text}>
          <p onClick={handleClick}>Terms of Use</p>
          <p onClick={handleClick}>Privacy Policy</p>
          <p>© 2020 ASES Global, all rights reserved.</p>
        </div>
      </div>
    </div>
  </div>
  </>
  );
}

export default Footer
