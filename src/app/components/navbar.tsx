import * as React from "react";
import {Nav, Navbar, NavItem} from "react-bootstrap";

interface NavbarProps{
    requestLogout: () => void;
}

export class AppNavbar extends React.Component<NavbarProps, undefined>{
    render(){
        return <Navbar id="dragarea" inverse fixedTop collapseOnSelect>
            <Navbar.Header>
                <Navbar.Toggle/>
                <Navbar.Brand>
                    <a href="#">OrpheuShare</a>
                </Navbar.Brand>
            </Navbar.Header>
            <Navbar.Collapse>
                <Nav pullRight>
                    <NavItem eventKey={1} href="#" onClick={this.props.requestLogout}>Log Out</NavItem>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    }
}