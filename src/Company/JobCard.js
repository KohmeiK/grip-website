import React, {useState} from "react"
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import {Spinner} from "react-bootstrap"

/**
 * Description: JobCard for **My Posted Jobs** page that only companies can view
 */
function JobCard(props){

  const [clickedAll, setClickedAll] = useState(false)
  const [clickedPartial, setClickedPartial] = useState(false)
  const [newApplicants, setNewApplicants] = useState(props.newApplicants)
  const handleClickAll = () => {
    setClickedAll(true)
    props.handleClick(props.index, props.title, true) // true for downloading all
  }
  const handleSecondClickAll = () => {
    props.handleSecondClick(props.index)
    handleClickAll()
  }

  const handleClickPartial = () => {
    setClickedPartial(true)
    props.handleClick(props.index, props.title, false) // false for not downloading all
    setNewApplicants(0)
  }

  let buttonPartial, buttonAll;
  if(!props.loadingAll){
    if(clickedAll){
      buttonAll =
      <>
      Downloading all resumes, this might take a while...
      <br/>
      <Button disabled onClick={handleClickAll}>
       Download all resumes
       <Spinner
         as="span"
         animation="border"
         size="sm"
         role="status"
         aria-hidden="true"
         />
       </Button>
       </>
    }
    else{
      buttonAll = <Button onClick={handleClickAll} disabled={props.allApplicants === 0}> Download all resumes </Button>
    }
  }else{
    buttonAll =
    <>
      All resumes downloaded
      <br/>
      <Button onClick={handleSecondClickAll}> Download again </Button>
    </>
  }

  if(!props.loadingPartial){
    if(clickedPartial){
      buttonPartial =
      <>
      Downloading new resumes, this might take a while...
      <br/>
      <Button variant="warning" disabled onClick={handleClickPartial}>
       Download all new resumes
       <Spinner
         as="span"
         animation="border"
         size="sm"
         role="status"
         aria-hidden="true"
         />
       </Button>
       </>
    }
    else{
      buttonPartial = <Button variant="warning" onClick={handleClickPartial} disabled={props.allApplicants === 0}> Download all new resumes </Button>
    }
  }else{
    buttonPartial =
    <>
      New resumes downloaded
      <br/>
      <Button variant="warning" disabled> Download all new resumes </Button>
    </>
  }

  return(
    <>
      <Card>
        {/* <Card.Img variant="top" src={imageURL} style={{height:"7em"}} /> */}
        <Card.Body>
          <Card.Title>{props.title}</Card.Title>
          <Card.Text>
              Deadline: {props.dl} <br/>
              Number of New Applicants: {newApplicants} <br/>
              Numbr of All Applicants: {props.allApplicants}
          </Card.Text>
        </Card.Body>
        <Card.Footer>
              {buttonPartial}<br/><br/>{buttonAll}
        </Card.Footer>
      </Card>
      <br/>

    </>
  )
}

export default JobCard

//This is for Image Placeholder before loading is done
// <img src="%PUBLIC_URL%/TempImg.png"/>
// <Image src={imageURL}/>
