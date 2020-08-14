import React, { useContext, useState, useEffect } from 'react'
import { Button, Spinner } from 'react-bootstrap'
import { Formik, Field, Form } from 'formik';
import { useHistory } from "react-router-dom";

import * as Yup from "yup"

import FirebaseContext from '../Firebase/'
import AuthContext from '../Firebase/AuthContext'

function EmailHandler() {
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

    var firebase = useContext(FirebaseContext)
    const authContext = useContext(AuthContext)
    var auth = firebase.auth;

    var intervalId;

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
            case 'verifyEmail':
                // Display email verification handler and UI.
                handleVerifyEmail(auth, actionCode, continueUrl, lang);
                break;
            case 'recoverEmail':
                // Display email recovery handler and UI.
                handleRecoverEmail(auth, actionCode, lang);
                break;
            default:
                // Error: invalid mode.
                setLocalDisplay(<h3>404 not found</h3>)
        }
    }, [])



    function handleResetPassword(auth, actionCode, continueUrl, lang) {
        // Localize the UI to the selected language as determined by the lang
        // parameter.
        var accountEmail;
        // Verify the password reset code is valid.
        auth.verifyPasswordResetCode(actionCode).then(function (email) {
            var accountEmail = email;

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

                                setLocalDisplay(
                                    <div>
                                        <h3>Password Reset. You can now log in with the new password.</h3>
                                        <Button onClick={() => history.push('/login')}>Go to login</Button>
                                    </div>
                                )
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
                                <br />
                                <Field name="pwd" type="password" />
                                {formik.touched.pwd && formik.errors.pwd ? (
                                    <div>{formik.errors.pwd}</div>
                                ) : null}
                                <br />
                                <label htmlFor="pwdConfirm">Confirm password: </label>
                                <br />
                                <Field name="pwdConfirm" type="password" />
                                {formik.touched.pwdConfirm && formik.errors.pwdConfirm ? (
                                    <div>{formik.errors.pwdConfirm}</div>
                                ) : null}
                                <br />
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


    function handleVerifyEmail(auth, actionCode, continueUrl, lang) {
        // Localize the UI to the selected language as determined by the lang
        // parameter.
        // Try to apply the email verification code.

        auth.applyActionCode(actionCode).then(function (resp) {
            // Email address has been verified.


            if (auth.currentUser) { // user is logged in already
                //Just to avoid more than 1 inverval
                if (intervalId) {
                    clearInterval(intervalId);
                }
                intervalId = setInterval(() => {
                    auth.currentUser
                        .reload()
                        .then(ok => {
                            if (auth.currentUser.emailVerified) {
                                authContext.forceUserUpdate(auth.currentUser)
                                clearInterval(intervalId);
                                history.push("/firstUpload")
                            }
                        })
                }, 1000)
            } else {
                history.push("/firstUpload")
            }

            setLocalDisplay(<h3>Redirecting...</h3>)

        }).catch(function (error) {
            // Code is invalid or expired. Ask the user to verify their email address
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

            setLocalDisplay(<h3>Email recovered. An password reset email has also been sent; reset your password if you'd like.</h3>)

            // You might also want to give the user the option to reset their password
            // in case the account was compromised:
            auth.sendPasswordResetEmail(restoredEmail).then(function () {
                // Password reset confirmation sent. Ask user to check their email.
            }).catch(function (error) {
                alert(error)
            });
        }).catch(function (error) {
            // Invalid code.
            setLocalDisplay(
                <h3>{error.message}</h3>
            )
        });

        // });
    }

    return (
        <div>
            {localDisplay}
        </div>
    )
}

export default EmailHandler
