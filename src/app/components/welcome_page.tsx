import * as React from "react";
import {Button, Col, Jumbotron, Panel, Row} from "react-bootstrap";
import { GoogleAuthHelper } from "../helpers/google_auth_helper";

interface WelcomePageProps{
    authHelper: GoogleAuthHelper
}

export class WelcomePage extends React.Component<WelcomePageProps, undefined>{
    render(){
        return <Jumbotron>
            <div className="container">
                <h1 className="text-center">Welcome</h1>
                <p className="text-center">Ready to enjoy some music around you?</p>
                <p className="text-center">It takes just one step to connect to the music around you.</p>
                <Row>
                    <Col xs={12} md={4} mdOffset={4}>
                        <Panel>
                            <Row>
                                <Col xs={12}>
                                    <Button className="btn-social btn-google" block onClick={this.props.authHelper.googleSignIn.bind(this.props.authHelper)}><span className="fa fa-google"/>Sign in with Google</Button>
                                </Col>
                            </Row>
                            <Row>
                                <Col xs={12}>
                                    <Button className="btn-social btn-facebook" block><span className="fa fa-facebook"/>Sign in with Facebook</Button>
                                </Col>
                            </Row>
                            <Row>
                                <Col xs={12}>
                                    <Button className="btn-social btn-soundcloud" block><span className="fa fa-soundcloud"/>Sign in with Soundcloud</Button>
                                </Col>
                            </Row>
                        </Panel>
                    </Col>
                </Row>
            </div>
        </Jumbotron>
    }
}