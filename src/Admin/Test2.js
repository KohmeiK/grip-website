import lol from './Test2.module.scss';

import React, { useEffect, useState, useContext } from "react"
import { Button } from 'react-bootstrap'
// below are the four library to npm install
import SimpleMDE from "react-simplemde-editor";
import snarkdown from 'snarkdown';
import ReactMarkdown from 'react-markdown'
import * as marked from 'marked'
import "easymde/dist/easymde.min.css";
import DatePicker from 'react-datepicker'
import moment from 'moment'
// import * as tz from 'moment-timezone'


import FirebaseContext from '../Firebase'

/**
 * Company Creation Container description goes here
 */
function Test() {
    const firebase = useContext(FirebaseContext)
    const [textValue, setTextValue] = useState('Placeholder')
    const [localDisplay, setLocalDisplay] = useState()
    const [date, setDate] = useState(null);
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [focused, setFocused] = useState(false)
    const [focusedInput, setFocusedInput] = useState(null)
    const handleChange = value => {
        setTextValue(value);
    };
    const handleClick = async () => {
        // setLocalDisplay(snarkdown(textValue))
        console.log(marked(textValue))
        return null
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
        firebase.storage.child('Screen Shot 2020-07-01 at 6.46.42 PM.png').getDownloadURL().then(function (url) {
            console.log(url)
        })
    }
    useEffect(() => {
        console.log("Making new fucntion call!")
        try {
            console.log(moment(1598354976273).format())
            return 
            // let ddl = 'Aug 24, 2020'
            // let standardized = moment(ddl).format('YYYY-MM-DD')
            // ddl = moment(standardized, "America/Los_Angeles")
            // // console.log('currentIme: ' + currentTime)
            // console.log('dl: ' + moment(ddl).format())
            // console.log(moment('2020-08-24').format())
            // return
            // const closeApplication = firebase.functions.httpsCallable('closeApplication')
            // const result = await closeApplication({ formVals: null })
            // console.log(result.data.message, "result.data.message")
            let date = 'Aug 24, 2020'
            let newt = moment(date).format('YYYY-MM-DD')
            let d = moment.tz('Aug 24, 2020', "America/Los_Angeles")
            var a = moment.tz("2013-11-18 11:55", "Asia/Taipei");
            let dl = d.valueOf()
            // console.log(d.utc().format())
            console.log(d.format())
            d = moment.tz(newt, "America/New_York")
            console.log(new Date().getTime() - d.valueOf())
            // console.log(d.format())
            // console.log(d.format())
        } catch (err) {
            alert(err);
        }

    }, [])



    return (
        <div className={`${lol.mainWrapper}`} style={{ paddingTop: "85px", paddingLeft: "30px" }}>


        </div>

    );


}

export default Test
