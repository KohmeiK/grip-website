import React, {useState, useContext, useEffect} from 'react'
import CompanyContainer from './CompanyContainer'
import ApplyModal from './ApplyModal'
import FirebaseContext from './Firebase'
import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import {CardColumns, Form, InputGroup, FormControl} from 'react-bootstrap'


function ApplyContainer(){
  const firebase = useContext(FirebaseContext)
  const [companies, setCompanies] = useState([]) //Data from DB
  const [display, setDisplay] = useState("Not Set") //JSX for List
  const [indexToShow, setIndexToShow] = useState(-1); //Modal
  const [show, setShow] = useState(false); //Modal show
  const [loading, setLoading] = useState(true); //Still loading array
  const handleClose = () => setShow(false);
  const handleShow = (index) => {
    setIndexToShow(index)
    setShow(true)
  }

  useEffect(() => {
    //Only on mount
    firebase.db.collection('companies')
    .get()
    .then(function (querySnapshot){ // no condition for query, thus returns all companies
        if (querySnapshot.docs.length === 0){
          return(<h1> Oops, there are currently no available internship! </h1>)
        }
        querySnapshot.forEach(function (doc){
          setCompanies(companies.push(doc.data())) //Add all companies to array
        })
        setCompanies(companies)
        setLoading(false)
    }).catch(function(error){
        console.log(error)
    })
  },[])

  let localDisplay = "Loading..."
  if(!loading)
  {
    localDisplay = companies.map(function annon(company, index){ //Convert each element to JSX
      //convert all elements before reach render, this is only updates when show is changed
      return(
        <div>
          <br />
          <CompanyContainer
            key={index}
            index={index}
            name={company.companyName}
            info={company.info}
            handleClose={handleClose}
            handleShow={handleShow}
            show={show && (index === indexToShow) ? true : false}
            uid={"(Ethan) Set ID in ApplyContainer.js line 57"}
            cid={"(Ethan) Set CID in ApplyContainer.js line 58"}
           />
        </div>
      );
    })
  }

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
            {localDisplay}
        </Col>
        <Col sm={3}>More Settings</Col>
      </Row>
    </Container>
    </div>
  )
}

export default ApplyContainer
