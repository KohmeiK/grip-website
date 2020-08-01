import React, { useState} from 'react'
import { useHistory, useLocation } from "react-router-dom";

function NeedCompany() {
  let location = useLocation()

  let { from } = location.state || { from: { pathname: "/" } };

  return(
    <h3>{`Sorry, you need an company acount to access "${from.pathname}".` }</h3>
  )
}

export default NeedCompany
