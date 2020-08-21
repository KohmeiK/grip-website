import React, { useContext, useEffect } from 'react'
import { Button } from 'react-bootstrap'
import { useHistory } from "react-router-dom";
import { useFormik } from 'formik';
import * as Yup from "yup"

import FirebaseContext from '../Firebase'

function Signup() {
    const firebase = useContext(FirebaseContext)
    let history = useHistory()

    const handleSubmit = async (values) => {
        try {

            //Wait to do anything until account is made
            const res = await firebase.auth.createUserWithEmailAndPassword(values.email, values.pwd)

            //make changes to user before saving, wait until changes made
            await res.user.updateProfile({ displayName: values.name })

            //update user value for context
            // authContext.setUser(res.user);

            //I can access authContext.user immedealty here
            //setUser is async so we need to deal with that

            const user = res.user

            // write in database
            firebase.db.collection("students").doc(user.uid).set({
                school: values.school,
                classYear: values.classYear,
                displayName: values.name, 
                lastUploadTime: null, 
                defResumeName: ''
            })

            user.sendEmailVerification()
            history.push("/verifyEmail")

        } catch (err) {
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
            classYear: '',
        },
        onSubmit: (values, { resetForm }) => {
            values.school = getSchool(values.email)
            resetForm()
            handleSubmit(values)
        },
        validationSchema: Yup.object({
            name: Yup.string()
                .required('Required'),
            email: Yup.string()
                .email('Invalid email address')
                // .matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.+-]+\.edu$/, 'Please sign up with a .edu email')
                .required('Required'),
            pwd: Yup.string()
                .min(6, 'Must be 6 characters or more')
                .required('Required'),
            pwdConfirm: Yup.string()
                .oneOf([Yup.ref('pwd'), null], 'Passwords must match'),
            classYear: Yup.string()
                .required('Required'),
        }),

    })

    const getSchool = (email) => {
        let withoutEdu = email.substring(0, email.length - 4) // drop .edu
        let at = withoutEdu.indexOf('@')
        let lastDot = withoutEdu.lastIndexOf('.')
        let school = withoutEdu.substring(Math.max(at, lastDot) + 1) // look for the substring b/n the last dot or @, which will be the school name
        return school
    }

    let arr = []
    let thisYear = new Date().getFullYear()
    for (let i = 0; i <= 10; i++) {
        arr[i] = i + thisYear
    }
    let dropDown = arr.map(item => // create a dropdown list for class year selection (from this year to 10 years later)
        <option value={item}>{item}</option>
    )


    return (
        <div className="w-50 m-auto">
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
                    {formik.touched.name && formik.errors.name ? (
                        <div>{formik.errors.name}</div>
                    ) : null}
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input
                        id="email"
                        name="email"
                        type="email"
                        className="form-control"
                        onChange={formik.handleChange}
                        value={formik.values.email}
                    />
                    {formik.touched.email && formik.errors.email ? (
                        <div>{formik.errors.email}</div>
                    ) : null}
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
                    {formik.touched.pwd && formik.errors.pwd ? (
                        <div>{formik.errors.pwd}</div>
                    ) : null}
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
                    {formik.touched.pwdConfirm && formik.errors.pwdConfirm ? (
                        <div>{formik.errors.pwdConfirm}</div>
                    ) : null}
                </div>
                <div className="form-group">
                    <label htmlFor="classYear">Class Year:</label>
                    <select
                        id="classYear"
                        name="classYear"
                        className="form-control"
                        onChange={formik.handleChange}
                        value={formik.values.classYear}>
                        <option value="" disabled selected>Select a year</option>
                        {dropDown}
                    </select>
                    {formik.touched.classYear && formik.errors.classYear ? (
                        <div>{formik.errors.classYear}</div>
                    ) : null}
                </div>
                <Button type="submit">Submit</Button>
            </form>

            <h4> Already have an account?</h4>
            <Button variant="secondary" onClick={() => history.push("/login")}>Sign In</Button>


        </div>
    )
}



export default Signup
