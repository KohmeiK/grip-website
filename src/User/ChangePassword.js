import React, { useContext, useState } from "react"
import { Formik, Field, Form } from 'formik';
import * as Yup from "yup"
import { Button, Modal, Spinner } from 'react-bootstrap'

import AuthContext from '../Firebase/AuthContext'
import FirebaseContext from '../Firebase'

function ChangePassword() {
    const authContext = useContext(AuthContext)
    const firebase = useContext(FirebaseContext)
    // const [initEmail, setInitEmail] = useState({ email: "Loading..." })

    const [finalFormVals, setFinalFormVals] = useState({})

    const [show, setShow] = useState(false);
    const [password, setPassword] = useState("");
    const [isUpdating, setIsUpdating] = useState(false)

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    // useEffect(() => {
    //     if (authContext.isAuthenticated) {
    //         console.log(authContext.user)
    //         setInitEmail({ email: authContext.user.email })
    //     }
    //     console.log(initEmail)
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [authContext])

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
            await authContext.user.updatePassword(finalFormVals.pwd)
            alert("Password Updated!")
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
                initialValues={{ pwd: '', pwdConfirm: '' }}
                onSubmit={async (values, { setSubmitting }) => {
                    handleShow()
                    console.log("Vals", values)
                    setFinalFormVals(values)
                }}
                validationSchema={Yup.object({
                    pwd: Yup.string()
                        .min(6, 'Must be 6 characters or more')
                        .required('Required'),
                    pwdConfirm: Yup.string()
                        .oneOf([Yup.ref('pwd'), null], 'Passwords must match'),
                })}
            >
                {formik => (
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
                        <br />

                        <Button disabled={authContext.isLoadingAuthState} type="submit">
                            {isUpdating && <Spinner
                                as="span"
                                animation="border"
                                size="sm"
                                role="status"
                                aria-hidden="true"
                            />}
                            Update Password
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
                        Update Password
                        </Button>
                    </Modal.Footer>
                </form>
            </Modal>
        </div>
    )
}

export default ChangePassword
