import React, {useState, useContext, useEffect} from 'react'
import CompanyContainer from './CompanyContainer'
import FirebaseContext from './Firebase'

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
          return <CompanyContainer id={Math.floor(Math.random() * 20)-10} name={company.companyName} info={company.info} />
        }))

    }).catch(function(error){
        console.log(error)
    })

  },[]);

  return(
    <div>
      {display}
    </div>
  )
}

export default ApplyContainer
