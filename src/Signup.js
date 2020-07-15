import React, { useState, useEffect, useContext } from 'react'
import FirebaseContext from './Firebase'
import AuthContext from './Firebase/AuthContext'
import {Button} from 'react-bootstrap'
import { useHistory } from "react-router-dom";

import { Formik, useFormik, Form, Field, ErrorMessage } from 'formik';


function Signup() {
    const authContext = useContext(AuthContext)
    const firebase = useContext(FirebaseContext)
    let history = useHistory()

    const handleSubmit = async(values) => {
      try{

        //Wait to do anything until account is made
        const res = await firebase.auth.createUserWithEmailAndPassword(values.email, values.pwd)

        //make changes to user before saving, wait until changes made
        await res.user.updateProfile({displayName: values.name,})

        //update user value for context
        authContext.setUser(res.user);

        //Pull new user value from context
        const user = authContext.user

        // write in database
        firebase.db.collection("students").doc(user.uid).set({
            name: values.name,
            email: values.email,
            school: values.school,
            classYear: values.classYear,
        })

        user.sendEmailVerification()
        alert('Signup Successful,' + user.displayName + ', please verify your email')

      } catch(err){
          //Catch all errors here!
          console.log(err)
          alert(err)
      }
    }

    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            pwd: '',
            pwdConfirm: '',
            school: '',
            classYear: '',
        },
        onSubmit: (values, {resetForm})  => {
            if (values.pwd === values.pwdConfirm) {
                resetForm()
                handleSubmit(values)
            } else {
                alert("Passwords don't match")
            }
        },
    })
    return (
        <div>
            <h3>Sign Up</h3>
            <form onSubmit={formik.handleSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Name:</label>
                    <input
                        id="name"
                        name="name"
                        type="text"
                        className="form-control"
                        onChange={formik.handleChange}
                        value={formik.values.name}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="emal">Email:</label>
                    <input
                        id="email"
                        name="email"
                        type="email"
                        className="form-control"
                        onChange={formik.handleChange}
                        value={formik.values.email}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="pwd">Password:</label>
                    <input
                        id="pwd"
                        name="pwd"
                        type="password"
                        className="form-control"
                        onChange={formik.handleChange}
                        value={formik.values.pwd}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="pwdConfirm">Re-enter Password:</label>
                    <input
                        id="pwdConfirm"
                        name="pwdConfirm"
                        type="password"
                        className="form-control"
                        onChange={formik.handleChange}
                        value={formik.values.pwdConfirm}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="school">School:</label>
                    <input
                        id="school"
                        name="school"
                        type="text"
                        className="form-control"
                        onChange={formik.handleChange}
                        value={formik.values.school}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="classYear">Class Year:</label>
                    <select
                        id="classYear"
                        name="classYear"
                        className="form-control"
                        onChange={formik.handleChange}
                        value={formik.values.classYear}>
                        <option value='2020' label='2020' />
                        <option value='2021' label='2021' />
                        <option value='2022' label='2022' />
                        <option value='2023' label='2023' />
                        <option value='2024' label='2024' />
                    </select>
                </div>
                <Button type="submit">Submit</Button>
            </form>

            <h4> Already have an account?</h4>
            <Button variant="secondary" onClick={()=>history.push("/login")}>Sign In</Button>


        </div>
    )
}



export default Signup
