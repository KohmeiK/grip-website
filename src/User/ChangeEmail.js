import React, { useContext, useEffect, useState } from "react"
import { Formik, Field, Form } from 'formik';
import * as Yup from "yup"
import { Button, Modal, Spinner } from 'react-bootstrap'

import AuthContext from '../Firebase/AuthContext'
import FirebaseContext from '../Firebase'

function ChangeEmail() {
    const authContext = useContext(AuthContext)
    const firebase = useContext(FirebaseContext)
    const [initEmail, setInitEmail] = useState({ email: "Loading..." })

    const [finalFormVals, setFinalFormVals] = useState({})

    const [show, setShow] = useState(false);
    const [password, setPassword] = useState("");
    const [isUpdating, setIsUpdating] = useState(false)

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(() => {
        if (authContext.isAuthenticated) {
            console.log(authContext.user)
            setInitEmail({ email: authContext.user.email })
        }
        console.log(initEmail)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [authContext])

    const handleSubmit = (evt) => {
        evt.preventDefault();
        handleUpdateInfo();
        setIsUpdating(true)
    }

    const handleUpdateInfo = async () => {

        const credential = firebase.raw.auth.EmailAuthProvider.credential(
            authContext.user.email,
            password
        );

        try {
            // Now you can use that to reauthenticate
            await authContext.user.reauthenticateWithCredential(credential);
            await authContext.user.updateEmail(finalFormVals.email)
            alert("Email Updated!")
        } catch (err) {
            alert(err)
        }
        handleClose()
        setIsUpdating(false)
    }

    return (
        <div>
            <Formik
                enableReinitialize={true}
                initialValues={initEmail}
                onSubmit={async (values, { setSubmitting }) => {
                    handleShow()
                    console.log("Vals", values)
                    setFinalFormVals(values)
                }}
                validationSchema={Yup.object({
                    email: Yup.string()
                        .email('Invalid email address')
                        // .matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.+-]+\.edu$/, 'Please sign up with a .edu email')
                        .required('Required')
                })}
            >
                {formik => (
                    <Form>
                        <label htmlFor="email">Email</label>
                        <br />
                        <Field id="email" name="email" type="email" />
                        {formik.touched.email && formik.errors.email ? (
                            <div>{formik.errors.email}</div>
                        ) : null}
                        <br />

                        <Button disabled={authContext.isLoadingAuthState || !formik.dirty} type="submit">
                            {isUpdating && <Spinner
                                as="span"
                                animation="border"
                                size="sm"
                                role="status"
                                aria-hidden="true"
                            />}
                            Update Info
                        </Button>
                    </Form>
                )}
            </Formik>
            <hr />
            <Modal keyboard={false} backdrop={isUpdating ? "static" : "null"} show={show} onHide={handleClose}>
                <form onSubmit={handleSubmit}>
                    <Modal.Header>
                        <Modal.Title>Enter Your Password to Update Your Info</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <label>
                            Password:
                            <input
                                type="password"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                            />
                        </label>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button disabled={isUpdating} variant="secondary" onClick={handleClose}>
                            Cancel
                        </Button>
                        <Button disabled={isUpdating} type="submit" value="Submit" variant="primary">
                            {isUpdating && <Spinner
                                as="span"
                                animation="border"
                                size="sm"
                                role="status"
                                aria-hidden="true"
                            />}
                        Update Email
                        </Button>
                    </Modal.Footer>
                </form>
            </Modal>
        </div>
    )
}

export default ChangeEmail
