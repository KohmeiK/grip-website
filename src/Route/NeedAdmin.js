import React, { useState} from 'react'
import { useHistory, useLocation } from "react-router-dom";

function NeedAdmin() {
  let location = useLocation()

  let { from } = location.state || { from: { pathname: "/" } };

  return(
    <h3>{`Sorry, you need an admin acount to access "${from.pathname}".` }</h3>
  )
}

export default NeedAdmin
