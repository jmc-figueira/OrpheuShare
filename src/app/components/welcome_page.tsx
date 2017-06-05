import * as React from "react";
import {Button, Col, Jumbotron, Panel, Row} from "react-bootstrap";
import {remote} from "electron";

export class WelcomePage extends React.Component<undefined, undefined>{
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
                                    <Button className="btn-social btn-google" block onClick={this.googleSignIn.bind(this)}><span className="fa fa-google"/>Sign in with Google</Button>
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

    private googleSignIn(){
        let authWindow = new remote.BrowserWindow({
            parent: remote.getCurrentWindow(),
            modal: true,
            show: false,
            webPreferences: {
                nodeIntegration: false,
                sandbox: true,
                webSecurity: false
            }
        });

        authWindow.loadURL("https://accounts.google.com/o/oauth2/v2/auth?client_id=683730810868-t8c74vd2q7lv1o5v4e7hl4o3a5hlepss.apps.googleusercontent.com&response_type=code&scope=openid%20profile%20email&redirect_uri=http://localhost&origin=http://localhost");
        authWindow.once("ready-to-show", () => authWindow.show());

        authWindow.on("close", function(){
            authWindow = null;
        });

        authWindow.webContents.on("will-navigate", function(event, newUrl){
            console.log(newUrl);
            authWindow.destroy();
        });

        authWindow.webContents.on('did-get-redirect-request', function (event, oldUrl, newUrl){
            console.log(newUrl);
            authWindow.destroy();
        });
    }
}