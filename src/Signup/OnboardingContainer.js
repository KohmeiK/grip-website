import React from 'react'

import styles from "./OnboardingContainer.module.scss"

import step1 from "../Media/Step1.svg"
import step2 from "../Media/Step2.svg"
import step3 from "../Media/Step3.svg"
import step4 from "../Media/Step4.svg"

import useWindowDimensions from '../useWindowDimensions.js'

function OnboardingContainer(props) {
  const { height, width } = useWindowDimensions();

  if(width > 650){
    return( //Desktop
      <div className={styles.background}>
        <div className={styles.mainBox}>
          <div className={styles.stepsWrapper}>
            <ul className={styles.steps}>
                <li className={props.onStep == 0 ? styles.doing : props.onStep >  0 && styles.done}> <img src={step1}/> </li><hr className={props.onStep > 0  && styles.done}/>
                <li className={props.onStep == 1 ? styles.doing : props.onStep >  1 && styles.done}> <img src={step2}/></li><hr className={props.onStep > 1  && styles.done}/>
                <li className={props.onStep == 2 ? styles.doing : props.onStep >  2 && styles.done}> <img src={step3}/></li> <hr className={props.onStep > 2  && styles.done}/>
                <li className={props.onStep == 3 ? styles.doing : props.onStep >  3 && styles.done}> <img src={step4}/></li>
            </ul>
            <ul className={styles.stepsCaption}>
              <li> Sign up </li>
              <li> Verify email </li>
              <li> Upload resume </li>
              <li> Apply </li>
            </ul>
          </div>
          {props.children}
        </div>
      </div>
    );
  }else{ //Mobile
    let oneText, twoText, threeText, fourText = null;
    switch (props.onStep) {
      case 0: oneText = <p>Sign up</p>; break;
      case 1: twoText = <p>Verify email</p>; break;
      case 2: threeText = <p>Upload resume</p>; break;
      case 3: fourText = <p>Apply</p>; break;
      default: oneText = <p>Error</p>; break;

    }
    return(
      <div className={styles.mobileBackground}>
        <ul className={styles.stepsWrap}>
          <li> <div className={props.onStep == 0 ? styles.doing : props.onStep >  0 && styles.done}>1</div> <>{oneText}</> </li>
          <li> <div className={props.onStep == 1 ? styles.doing : props.onStep >  1 && styles.done}>2</div> <>{twoText}</> </li>
          <li> <div className={props.onStep == 2 ? styles.doing : props.onStep >  2 && styles.done}>3</div> <>{threeText}</> </li>
          <li> <div className={props.onStep == 3 ? styles.doing : props.onStep >  3 && styles.done}>4</div> <>{fourText}</> </li>
        </ul>
        <div className={styles.contentWrap}>
            {props.children}
        </div>
      </div>
    );
  }
}

export default OnboardingContainer
