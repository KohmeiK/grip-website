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
    const handleClick = async () => {
        // setLocalDisplay(snarkdown(textValue))
        console.log(marked(textValue))
        // return null
        try {
            // write in database
            await firebase.db.collection("jobs").doc('12345').set({
                mde: textValue
            })
            console.log('done')

        } catch (err) {
            //Catch all errors here!
            console.log(err)
            alert(err)
        }
    }

    const handleClick2 = async () => {
        let jobRef = firebase.db.collection('jobs').doc('12345')
        jobRef.get().then(async function (doc) {
            await setLocalDisplay(marked(doc.data().mde))
            console.log('done rednering')
        }).catch(function (error) {
            console.log(error)
        })
    }

    const testURL = () => {
        firebase.storage.child('Screen Shot 2020-07-01 at 6.46.42 PM.png').getDownloadURL().then(function(url){
            console.log(url)
        })
    }

    return (
        <div>

            {/* <h3 id="header">Header</h3>
            <ul class="list-inline">
                <li>list1</li>
                <li>list2</li>
                <li>list3</li>
            </ul> */}
            <Button onClick={handleClick}>write in db</Button>
            <br/>
            <Button onClick={handleClick2}>render from db</Button>
            <SimpleMDE value={textValue} onChange={handleChange} />
            <h6>marked:</h6>
            <p dangerouslySetInnerHTML={{ __html: marked(textValue) }} />
            {/* <h6>snarkdown:</h6>
            <p dangerouslySetInnerHTML={{ __html: snarkdown(textValue) }} />

            <h6>ReactMarkdown:</h6>
            <ReactMarkdown source={textValue} /> */}

            <h6>DB render: </h6>
            <p dangerouslySetInnerHTML={{ __html: localDisplay }} />

            <br/> <br/> <br/> <br/>

            <Button onClick={testURL}>test url</Button>
        </div>

    );


}

export default CompanyCreationContainer
