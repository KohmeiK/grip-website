import styles from './About.module.scss';

import React from 'react'

/**
* This is just a static section that for the About / Mission Statement section.
* Couple werid diagonalBox things going on as usual
*/
function About(){
  return(
  <div className={`${styles.aboutWrapper} ${styles.diagonalBox}`}>
    <div className={`${styles.aboutText} ${styles.content}`}>
      <h4> A Whole New World</h4>
      <p> The ASES Abroad program is an ASES initiative that seeks to connect
       our talented members at Stanford with innovative, disruptive startups
       and SME's across the globe. We are committed to the belief that
       entrepreneurship is a global phenomenon. Explore what opportunities
       lie ahead of you, beyond Silicon Valley, and beyond the bay.
       Explore ASES Abroad.</p>
    </div>
  </div>
  );
}

export default About
