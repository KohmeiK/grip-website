import React, { useEffect, useState, useContext } from "react"
import { Button } from 'react-bootstrap'
// below are the four library to npm install 
import SimpleMDE from "react-simplemde-editor";
import snarkdown from 'snarkdown';
import ReactMarkdown from 'react-markdown'
import * as marked from 'marked'
import "easymde/dist/easymde.min.css";

import FirebaseContext from '../Firebase'

/**
 * Company Creation Container description goes here
 */
function CompanyCreationContainer() {
    const firebase = useContext(FirebaseContext)
    const [textValue, setTextValue] = useState('Placeholder')
    const [localDisplay, setLocalDisplay] = useState()
    const handleChange = value => {
        setTextValue(value);
    };
    const handleClick = async() => {
        setLocalDisplay(snarkdown(textValue))
        alert(textValue)
        // try {
        //     // write in database
        //     await firebase.db.collection("jobs").add({
        //         mde: textValue
        //     })
        //     console.log('done')

        // } catch (err) {
        //     //Catch all errors here!
        //     console.log(err)
        //     alert(err)
        // }
    }
    

    return (
        <div>
            
            <SimpleMDE value={textValue} onChange={handleChange} />
            {/* <Button onClick={handleClick}>Click Me</Button>
            <br/>
            <br/>
            <br/> */}
            <h6>marked:</h6>
            <p dangerouslySetInnerHTML={{__html: marked(textValue)}}/>
            <h6>snarkdown:</h6>
            <p dangerouslySetInnerHTML={{__html: snarkdown(textValue)}}/>

            <h6>ReactMarkdown:</h6>
            <ReactMarkdown source={textValue} />
            {/* {localDisplay} */}
        </div>
        
    );


}

export default CompanyCreationContainer
