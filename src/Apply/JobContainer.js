import React, { useState, useEffect } from "react"
import { Card, Button, Collapse, Badge, Row, Col } from 'react-bootstrap'

import * as marked from 'marked'
import moment from 'moment'

import ApplyModal from "./ApplyModal.js"

import expandArrow from "../Media/DarkDownArrow.svg"

import styles from './JobContainer.module.scss';


function Label(props){
  const labelStyle = {
    background: "#DEE2EA",
    borderRadius: "5px",
    padding: "0 10px",
    margin: "0 5px",
  };
  return(
    <div style={labelStyle}>
      {props.children}
    </div>
  )
}

//Job card for Apply page
function JobContainer(props) {

  // const imageURL = "https://picsum.photos/" + (800 + props.index) + "/100"
  //just to randomize image

  const [open, setOpen] = useState(false)
  const [reqSkills, setReqSkills] = useState()
  const [preSkills, setPreSkills] = useState()
  const [info, setInfo] = useState()
  const [companyInfo, setCompanyInfo] = useState()
  const [localApplied, setLocalApplied] = useState(false) // turn true after one applies to the job, disabling the Apply button
  const [remainingTime, setRemainingTime] = useState(null)
  const [modal, setModal] = useState(null)
  const handleClick = () => {
    setModal(
      <ApplyModal
        key={props.index}
        index={props.index}
        studentName={props.studentName}
        studentID={props.studentID}
        title={props.title}
        jobID={props.jobID}
        dl={props.dl}
        location={props.location}
        companyName={props.companyName}
        companyLogoURL={props.companyLogoURL}
        reqCoverLetter={props.reqCoverLetter}
        handleClose={handleClose}
        setLocalApplied={setLocalApplied}
      />
    )
  }
  const handleClose = () => setModal()

  function timeSince(date) {

    var days = Math.ceil((new Date() - date) / 1000 / 86400);

    var interval = days / 365;

    if (interval > 1) {
      if (Math.floor(interval === 1)) {
        return "1 year"
      }
      return Math.floor(interval) + " years";
    }
    interval = days / 30;
    if (interval > 1) {
      if (Math.floor(interval) === 1) {
        return "1 month"
      }
      return Math.floor(interval) + " months";
    }

    if (days === 1) {
      return "1 day"
    }
    return days + " days"
  }

  function timeUntil(date) {

    var days = Math.floor((date - new Date()) / 1000 / 86400);

    if (days < 0) {
      return null
    }

    if (days > 3) {
      return true
    }

    if (days === 1) {
      return '1 day left'
    }

    return days + ' days left'
  }


  useEffect(() => {
    let reqSkillsBuilder, preSkillsBuilder
    reqSkillsBuilder = props.reqSkills.map(skill => {
      return <Label>{skill}</Label>
    })
    preSkillsBuilder = props.preSkills.map(skill => {
      return <Label>{skill}</Label>
    })
    setReqSkills(reqSkillsBuilder)
    setPreSkills(preSkillsBuilder)

    setInfo(<p dangerouslySetInnerHTML={{ __html: marked(props.info) }} />)

    setCompanyInfo(<p dangerouslySetInnerHTML={{ __html: marked(props.companyInfo) }} />)

    let localDL = moment(props.dl).subtract(1, 'days').valueOf() // unix time in local time zone; ddl displayed to users is one day before the actual deadline
    setRemainingTime(timeUntil(localDL))

  }, [])



  return (
    <>
      <div className={styles.blackLine}>
        <div className={styles.cardBG}>
          <div className={styles.leftCol}>
              <img src={props.companyLogoURL}></img>
              <p>{props.companyName} </p>
          </div>

          <div className={styles.rightCol}>
            <div className={styles.row1}>
                <h3>{props.title}</h3>
                <img className={`${open && styles.flipped}`}src={expandArrow} onClick={() => setOpen(!open)} />
            </div>
            <div className={styles.row2}>
                <p>{props.location}</p>
                <p>{props.duration}</p>
                <button className={styles.mainButton} disabled={props.applied || localApplied || !remainingTime || props.isCompany} onClick={handleClick}> Apply </button>
                {(props.applied || localApplied ) && <p className="font-italic">You've applied to this job</p>}
            </div>
            <div className={`${styles.row3} ${open && styles.wrapOn}`}>
                <p>Required:</p>
                {reqSkills}
            </div>
            <div className={`${styles.row4} ${open && styles.wrapOn}`}>
                <p>Preferred:</p>
                {preSkills}

            </div>

            <div className={styles.row5}>
                Posted: {timeSince(props.timePosted) + ' ago'} <br />
            </div>
          </div>
        </div>

        <div className={`${styles.markDown} ${open ? styles.body : styles.hidden}`}>
              <h6>About {props.companyName}: </h6>
              {companyInfo} <br />
              <h6>About the Job:</h6>
              {info}
        </div>

      </div>
      {modal}

    </>
  )
}

export default JobContainer


//
// <Card>
//   <Card.Header>
//     <Row>
//       <Col sm={3}>
//         <img src={props.companyLogoURL} width="100%"></img>
//         {props.companyName}
//       </Col>
//
//       <Col sm={9}>
//         <Card.Title>{props.title}</Card.Title>
//         <Card.Text style={{ wordWrap: "breakWord" }}>
//            <br />
//           {props.location} <br />
//           Duration: {props.duration} <br />
//           Required Skills: <br />
//           {reqSkills} <br />
//           Preferred Skills: <br />
//           {preSkills} <br />
//           {props.reqCoverLetter &&
//             <p className="text-danger">Requires Cover Letter <br /> </p>}
//           Posted: {timeSince(props.timePosted) + ' ago'} <br />
//           {remainingTime ? remainingTime : <p className="text-danger">Deadline Passed!</p>}
//
//           <Button disabled={props.applied || localApplied || !remainingTime || props.isCompany} onClick={handleClick}> Apply! </Button>
//           {(props.applied || localApplied ) && <p className="font-italic">You've applied to this job</p>}
//
//         </Card.Text>
//     <Button onClick={() => setOpen(!open)}
//           aria-expanded={open}>
//           Expand
//     </Button>
//       </Col>
//     </Row>
//   </Card.Header>
//
//   <Collapse in={open}>
//     <Card.Body className={styles.markDown}>
//       <h6>About {props.companyName}: </h6>
//       {companyInfo} <br />
//       <h6>About the Job:</h6>
//       {info}
//     </Card.Body>
//   </Collapse>
// </Card>

//This is for Image Placeholder before loading is done
// <img src="%PUBLIC_URL%/TempImg.png"/>
// <Image src={imageURL}/>
