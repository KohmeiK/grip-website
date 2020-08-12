import React, { useContext, useState, useEffect } from 'react'
import { Button, Spinner } from 'react-bootstrap'
import { Formik, Field, Form } from 'formik';
import { useHistory } from "react-router-dom";

import * as Yup from "yup"

import FirebaseContext from '../Firebase/'

function EmailHandler() {
    // TODO: Implement getParameterByName()
    function getParameterByName(name, url) {
        if (!url) url = window.location.href;
        name = name.replace(/[\[\]]/g, '\\$&');
        var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
            results = regex.exec(url);
        if (!results) return null;
        if (!results[2]) return '';
        return decodeURIComponent(results[2].replace(/\+/g, ' '));
    }

    const [localDisplay, setLocalDisplay] = useState(null)
    const history = useHistory()

    // Configure the Firebase SDK.
    // This is the minimum configuration required for the API to be used.
    // var config = {
    //     'apiKey': 'AIzaSyBI-HC_K_CzKsv7oTV1ERDNDN3PbkRt6cM' // Copy this key from the web initialization
    //     // snippet found in the Firebase console.
    // }
    // var app = firebase.initializeApp(config);
    var firebase = useContext(FirebaseContext)
    var auth = firebase.auth;

    useEffect(() => {
        // Get the action to complete.
        var mode = getParameterByName('mode');
        // Get the one-time code from the query parameter.
        var actionCode = getParameterByName('oobCode');
        // (Optional) Get the continue URL from the query parameter if available.
        var continueUrl = getParameterByName('continueUrl');
        // (Optional) Get the language code if available.
        var lang = getParameterByName('lang') || 'en';

        // Handle the user management action.
        switch (mode) {
            case 'resetPassword':
                // Display reset password handler and UI.
                handleResetPassword(auth, actionCode, continueUrl, lang);
                break;
            case 'recoverEmail':
                // Display email recovery handler and UI.
                handleRecoverEmail(auth, actionCode, lang);
                break;
            case 'verifyEmail':
                // Display email verification handler and UI.
                handleVerifyEmail(auth, actionCode, continueUrl, lang);
                break;
            default:
            // Error: invalid mode.
        }
    }, [])



    function handleResetPassword(auth, actionCode, continueUrl, lang) {
        // Localize the UI to the selected language as determined by the lang
        // parameter.
        var accountEmail;
        // Verify the password reset code is valid.
        auth.verifyPasswordResetCode(actionCode).then(function (email) {
            var accountEmail = email;

            // TODO: Show the reset screen with the user's email and ask the user for
            // the new password.
            let newPassword = 'abcdefg' // FIX THIS LATER
            setLocalDisplay(
                <div>
                    <h3>Please enter the new password for {accountEmail}</h3>
                    <Formik
                        initialValues={{ pwd: '', pwdConfirm: '' }}
                        onSubmit={(values) => {
                            // Save the new password.
                            let newPassword = values.pwd
                            auth.confirmPasswordReset(actionCode, newPassword).then(function (resp) {
                                // Password reset has been confirmed and new password updated.

                                // TODO: Display a link back to the app, or sign-in the user directly
                                // if the page belongs to the same domain as the app:
                                // auth.signInWithEmailAndPassword(accountEmail, newPassword);
                                setLocalDisplay(
                                    <div>
                                        <h3>Password Reset. You can now log in with the new password.</h3>
                                        <Button onClick={() => history.push('/login')}>Go to login</Button>
                                    </div>
                                )

                                // TODO: If a continue URL is available, display a button which on
                                // click redirects the user back to the app via continueUrl with
                                // additional state determined from that URL's parameters.
                            }).catch(function (error) {
                                // Error occurred during confirmation. The code might have expired or the
                                // password is too weak.
                                alert(error)
                            });
                        }}
                        validationSchema={Yup.object({
                            pwd: Yup.string()
                                .min(6, 'Must be 6 characters or more')
                                .required('Required'),
                            pwdConfirm: Yup.string()
                                .oneOf([Yup.ref('pwd'), null], 'Passwords must match'),
                        })}
                    >
                        {(formik, isSubmitting) => (
                            <Form>
                                <label htmlFor="pwd">New password: </label>
                                <br/>
                                <Field name="pwd" type="password" />
                                {formik.touched.pwd && formik.errors.pwd ? (
                                    <div>{formik.errors.pwd}</div>
                                ) : null}
                                <br />
                                <label htmlFor="pwdConfirm">Confirm password: </label>
                                <br/>
                                <Field name="pwdConfirm" type="password" />
                                {formik.touched.pwdConfirm && formik.errors.pwdConfirm ? (
                                    <div>{formik.errors.pwdConfirm}</div>
                                ) : null}
                                <br/>
                                <Button disabled={isSubmitting} type="submit">
                                    {isSubmitting && <Spinner
                                        as="span"
                                        animation="border"
                                        size="sm"
                                        role="status"
                                        aria-hidden="true"
                                    />}
                                    Submit
                                </Button>
                            </Form>
                        )}
                    </Formik>
                </div>
            )


        }).catch(function (error) {
            // Invalid or expired action code. Ask user to try to reset the password
            // again.
            setLocalDisplay(
                <h3>{error.message}</h3>
            )
        });
    }

    function handleRecoverEmail(auth, actionCode, lang) {
        // Localize the UI to the selected language as determined by the lang
        // parameter.
        var restoredEmail = null;
        // Confirm the action code is valid.
        auth.checkActionCode(actionCode).then(function (info) {
            // Get the restored email address.
            restoredEmail = info['data']['email'];

            // Revert to the old email.
            return auth.applyActionCode(actionCode);
        }).then(function () {
            // Account email reverted to restoredEmail

            // TODO: Display a confirmation message to the user.

            // You might also want to give the user the option to reset their password
            // in case the account was compromised:
            auth.sendPasswordResetEmail(restoredEmail).then(function () {
                // Password reset confirmation sent. Ask user to check their email.
            }).catch(function (error) {
                // Error encountered while sending password reset code.
            });
        }).catch(function (error) {
            // Invalid code.
        });
    }

    function handleVerifyEmail(auth, actionCode, continueUrl, lang) {
        // Localize the UI to the selected language as determined by the lang
        // parameter.
        // Try to apply the email verification code.

        // try{
        //     await auth.applyActionCode(actionCode)
        //     setLocalDisplay(
        //         <div>
        //             <h3>Email verified. Click on the button below to continue</h3>
        //             <Button onClick={() => history.push('/firstUpload')}>Continue</Button>
        //         </div>
        //     )
        // } catch (error){
        //     setLocalDisplay(
        //         <h3>{error.message}</h3>
        //     )
        // }

        auth.applyActionCode(actionCode).then(function (resp) {
            // Email address has been verified.

            // TODO: Display a confirmation message to the user.
            // You could also provide the user with a link back to the app.

            // history.push('/firstUpload')
            setLocalDisplay(
                <div>
                    <h3>Email verified. Click on the button below to continue</h3>
                    <a href="./firstUpload">Continue</a>
                    {/* <Button onClick={() => history.push('/firstUpload')}>Continue</Button> */}
                </div>
            )

            // TODO: If a continue URL is available, display a button which on
            // click redirects the user back to the app via continueUrl with
            // additional state determined from that URL's parameters.
        }).catch(function (error) {
            // Code is invalid or expired. Ask the user to verify their email address
            // again.
            setLocalDisplay(
                <h3>{error.message}</h3>
            )
        });
    }

    return (
        <div>
            {localDisplay}
        </div>
    )
}

export default EmailHandler