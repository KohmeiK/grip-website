import React, {useState, useContext, useEffect} from 'react'
import CompanyContainer from './CompanyContainer'
import FirebaseContext from './Firebase'

function ApplyContainer(){
  const firebase = useContext(FirebaseContext)
  const [companies, setCompanies] = useState([])

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
        let temp = companies.map(function(company){
          return <CompanyContainer name={company.companyName} info={company.info} />
        })
        setCompanies(temp)

    }).catch(function(error){
        console.log(error)
    })

    // var te = [{a:"a",b:"b",c:"d"},{a2:"a",b:"b",c:"d"}];
    // console.log(te)
    // console.log(te[0])


    // var temp2 = temp.map(function(company){
    //   // return <CompanyContainer name={company.companyName} info={company.info} />
    //   return "Test"
    // })
    // console.log(temp2)
    // console.log(companiesList)
    // setCompanies(companiesList)
  },[]);
  let text = "None"
  if(companies.length != 0){
    text = companies

  }

  return(
    <div>
      {text}
    </div>
  )
}

export default ApplyContainer
