import React , {useState, useEffect}from 'react'
// import fire from './Fire';

function TestPage(){

  const[text,setText] = useState("Default Text / No Info")
  // const db = fire.firestore()
  const db = null

  useEffect(() => {
    db.collection('companies')
        .get()
        .then(function (querySnapshot){ // no condition for query, thus returns all companies
            console.log("In compnay list")
            console.log(querySnapshot.docs.length)
            if (querySnapshot.docs.length === 0){
                setText('Oops, there are currently no available internship!')
            }

            querySnapshot.forEach(function (doc){
                let company = doc.data()
                let companyName = company.companyName
                let info = company.info
                console.log("Name: " + companyName)
                console.log("Info: " + info)
                setText(companyName + "  /  " + info)
            })
        }).catch(function(error){
            console.log(error)
        })
  },[]); //Run only onMount

  // const [test, setTest] = useState("")
  //   /* Create reference to messages in Firebase Database */
  // let messagesRef = fire.database().ref('users');
  // messagesRef.on('child_added', snapshot => {
  //   /* Update React state when message is added at Firebase Database */
  //   let message = { text: snapshot.val(), id: snapshot.key };
  //   setTest(message.text)
  // })
  return(
    <div>
      Hi. This Div works
      <br />
      {text}
    </div>
  )
}



export default TestPage
