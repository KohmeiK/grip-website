import React, {useState} from "react"
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import {Spinner} from "react-bootstrap"

//JobCard for My Poseted Jobs page
function JobCard(props){

  const [clicked, setClicked] = useState(false)
  const handleClick = () => {
    setClicked(true)
    props.handleClick(props.index, props.title)
  }
  const handleSecondClick = () => {
    props.handleSecondClick(props.index)
    handleClick()
  }

  let buttonHTML;
  if(!props.loading){
    if(clicked){
      buttonHTML =
      <>
      Downloading all resumes, this might take a while...
      <br/>
      <Button disabled onClick={handleClick}>
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
      buttonHTML = <Button onClick={handleClick}> Download all resumes </Button>
      
    }
  }else{
    buttonHTML =
    <>
    Resumes downloaded
    <br/>
    <Button onClick={handleSecondClick}> Download again </Button>
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
