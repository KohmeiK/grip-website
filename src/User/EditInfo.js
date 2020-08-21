import React from "react"
import { Row, Col, Container } from 'react-bootstrap'
import {
    Switch,
    Route,
    Link,
    useRouteMatch,
} from "react-router-dom";
import { Nav } from 'react-bootstrap'

import InfoUpdate from './InfoUpdate'
import UploadForm from './UploadForm'
import ChangeEmail from './ChangeEmail'
import ChangePassword from './ChangePassword'

function EditInfo() {
    let match = useRouteMatch()
    return (
        <div style={{ background: "#e0e0e0", paddingTop: "85px" }} >
            <Container fluid style={{ paddingTop: "2em" }}>
                <Row>
                    <Col>
                        <Nav className="flex-column">
                            <Nav.Link as={Link} to={`${match.url}/basic`}>Edit Profile</Nav.Link>
                            <Nav.Link as={Link} to={`${match.url}/email`}>Change Email</Nav.Link>
                            <Nav.Link as={Link} to={`${match.url}/password`}>Change Password</Nav.Link>
                            <Nav.Link as={Link} to={`${match.url}/resume`}>Update Resume</Nav.Link>
                        </Nav>
                    </Col>
                    <Col sm={7}>
                        <Switch>
                            <Route path={`${match.url}/basic`}>
                                <InfoUpdate />
                            </Route>
                            <Route path={`${match.url}/email`}>
                                <ChangeEmail />
                            </Route>
                            <Route path={`${match.url}/password`}>
                                <ChangePassword />
                            </Route>
                            <Route path={`${match.url}/resume`}>
                                <UploadForm />
                            </Route>
                            <Route path={match.path}> {/* if there isn't a children route indicated, go to basic */}
                                <InfoUpdate />
                            </Route>
                        </Switch>
                    </Col>
                    <Col sm={3}>More Settings</Col>
                </Row>
            </Container>

        </div>
    )
}

export default EditInfo
