import React, {useState, useContext, useEffect} from 'react'
import CompanyContainer from './CompanyContainer'
import FirebaseContext from './Firebase'
import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import {CardColumns, Form, InputGroup, FormControl} from 'react-bootstrap'


function ApplyContainer(){
  const firebase = useContext(FirebaseContext)
  const [companies, setCompanies] = useState([])
  const [display, setDisplay] = useState("Loading...")

  useEffect(() => {
    //This is called every time the component shows up on the screen
    firebase.db.collection('companies')
    .get()
    .then(function (querySnapshot){ // no condition for query, thus returns all companies
        if (querySnapshot.docs.length === 0){
          return(<h1> Oops, there are currently no available internship! </h1>)
        }
        querySnapshot.forEach(function (doc){
          setCompanies(companies.push(doc.data())) //Add all companies to array
        })
        setDisplay(companies.map(function(company){ //Convert each element to JSX
          return(
            <CompanyContainer id={Math.floor(Math.random() * 20)-10} name={company.companyName} info={company.info} />
          );
        }))

    }).catch(function(error){
        console.log(error)
    })

  },[]);

  return(
    <div style={{background:"#e0e0e0"}} >
    <Container fluid style={{paddingTop: "2em"}}>
      <Row>
        <Col>
          <div style={{marginLeft: "1em", borderRadius: "25px", background:"white", height: "40em"}}>
            <div style={{margin: "2em", marginTop: "0em",  background:"white", height: "40em"}}>
              Search Options Go Here
            </div>
          </div>
        </Col>
        <Col sm={7}>
        <Form>
          <Form.Row className="align-items-center">
            <Col>
              <Form.Label htmlFor="inlineFormInputGroup" srOnly>
                Some Eventual Search Feature Could Go Here
              </Form.Label>
              <InputGroup className="mb-2">
                <FormControl id="inlineFormInputGroup" placeholder="Some Eventual Search Feature Could Go Here" />
                <InputGroup.Append>
                  <InputGroup.Text>Search</InputGroup.Text>
                </InputGroup.Append>
              </InputGroup>
            </Col>
          </Form.Row>
        </Form>
          <br />
          <CardColumns>
            {display}
          </CardColumns>
        </Col>
        <Col sm={3}>More Settings</Col>
      </Row>
    </Container>
    </div>
  )
}

export default ApplyContainer
