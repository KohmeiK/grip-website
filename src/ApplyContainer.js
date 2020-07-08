import React from 'react'
import CompanyContainer from './CompanyContainer'

function ApplyContainer(){
  const numberOfCompanies = 2;
  if(numberOfCompanies === 0){
    return<h1> Oops, there are currently no available internship! </h1>
  }
  return(
    <div>
      <CompanyContainer name="Kadoya Enterprise" info="Kohmei Kadoya is the king of this enterprise and you need his permission to join" />
      <CompanyContainer name="Amazon" info="A small startup in Seattle that will likely go broke in the next few months"/>
    </div>
  )
}

export default ApplyContainer
