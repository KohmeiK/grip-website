import React, {useState} from "react"
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import Image from './Image'
import ApplyModal from "./ApplyModal.js"
import {Spinner} from "react-bootstrap"

//JobCard for My Poseted Jobs page
function JobCard(props){

  const [clicked, setClicked] = useState(false)
  const handleClick = () => {
    setClicked(true)
    props.handleClick(props.index)
  }

  let buttonHTML;
  if(!props.loading){
    if(clicked){
      buttonHTML =
      <>
      Collecting your resumes and prepearing for download. Give us a few secconds...
      <br/>
      <Button disabled variant="warning" onClick={handleClick}>
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
      buttonHTML = <Button variant="warning" onClick={handleClick}> Download all resumes </Button>
    }
  }else{
    buttonHTML =
    <>
    Your download is ready!
    <br/>
    <Button href={props.url} download> Download </Button>
    </>
  }
  console.log(buttonHTML)

  return(
    <>
      <Card>
        {/* <Card.Img variant="top" src={imageURL} style={{height:"7em"}} /> */}
        <Card.Body>
          <Card.Title>{props.title}</Card.Title>
          <Card.Text>
              Deadline: {props.dl} <br/>
              Number of Applicants: {props.applicantNum}
          </Card.Text>
        </Card.Body>
        <Card.Footer>
              {buttonHTML}
        </Card.Footer>
      </Card>
      <br/>
      {/*Normally Hidden*/}

    </>
  )
}

export default JobCard

//This is for Image Placeholder before loading is done
// <img src="%PUBLIC_URL%/TempImg.png"/>
// <Image src={imageURL}/>
