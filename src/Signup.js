import React, { useState, useEffect, useContext } from 'react'
import FirebaseContext from './Firebase'

import { Formik, useFormik, Form, Field, ErrorMessage } from 'formik';

function Signup() {
    const firebase = useContext(FirebaseContext)
    let auth = firebase.auth
    let db = firebase.db

    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            pwd: '',
            pwdConfirm: '',
            school: '',
            classYear: '',
        },
        onSubmit: values => {
            if (values.pwd === values.pwdConfirm) {
                auth.createUserWithEmailAndPassword(values.email, values.pwd)
                    .catch(error => {
                        alert(error.message)
                    })
                let user = auth.currentUser
                user.updateProfile({
                    displayName: values.name,
                })
                db.collection("students").doc(user.uid).set({ // write in database
                    name: values.name,
                    email: values.email,
                    school: values.school,
                    classYear: values.classYear
                }).catch(function (error) {
                    alert("Error writing document: ", error);
                })
                user.sendEmailVerification()
                    .then(function () {

                    }).catch(function (error) {
                        alert(error)
                    })
                alert('Signup Successful,' + user.displayName + ', please verify your email')

            } else {
                alert("Passwords don't agree")
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
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}



export default Signup 
