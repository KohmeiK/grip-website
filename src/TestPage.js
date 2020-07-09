import React , {useState, useEffect}from 'react'

function TestPage(){
  // let auth = firebase.auth();
  // let db = firebase.firestore(); 

  const  [user, setUser] = useState(true);
  

  let text =""
  if(user){
    text = "Logged In"
  }else{
    text = "Logged out"
  }

  useEffect(function(){
    setUser(false)
    
  })

  return(
    <div>
      <h1>
        enter your email 
      </h1>
      <h2>
          {text}
      </h2>
      <input type="email" id="email"></input>

    </div>
  )
}



export default TestPage
