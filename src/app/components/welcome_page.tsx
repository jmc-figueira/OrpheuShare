import * as React from "react";
import {Button, Col, Jumbotron, Panel, Row} from "react-bootstrap";

interface WelcomePageProps{
    requestLogin: () => void;
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
                                    <Button className="btn-social btn-spotify" block onClick={this.props.requestLogin}><span className="fa fa-spotify"/>Sign in with Spotify</Button>
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