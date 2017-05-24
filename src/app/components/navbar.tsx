import * as React from "react";
import {Nav, Navbar, NavItem} from "react-bootstrap";

export class AppNavbar extends React.Component<undefined, undefined>{
    render(){
        return <Navbar id="dragarea" inverse fixedTop collapseOnSelect>
            <Navbar.Header>
                <Navbar.Brand>
                    <a href="#">OrpheuShare</a>
                </Navbar.Brand>
            </Navbar.Header>
            <Navbar.Collapse>
                <Nav pullRight>
                    <NavItem eventKey={1} href="#">Log Out</NavItem>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    }
}