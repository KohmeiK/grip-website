import React from "react"
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'

function CompanyContainer(props){
  return(
    <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src="https://picsum.photos/1000/600" />
      <Card.Body>
        <Card.Title>{props.name}</Card.Title>
        <Card.Text>
          {props.info}
        </Card.Text>
        <Button variant="primary">More Info</Button>
      </Card.Body>
    </Card>
  )
}

export default CompanyContainer
