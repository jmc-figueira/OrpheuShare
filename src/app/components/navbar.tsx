import * as React from "react";
import { Nav, Navbar, NavDropdown, Image, MenuItem} from "react-bootstrap";
import { User } from "../helpers/user";

interface NavbarProps{
    requestLogout: () => void;
    loggedIn: User | false;
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
                    {this.props.loggedIn ? (
                        <NavDropdown eventKey={1} title={
                            <span>
                                <Image src={this.props.loggedIn.profilePic} rounded width={15} height={15}/>
                                {" " + this.props.loggedIn.name}
                            </span>
                        } id="user-menu">
                            <MenuItem eventKey={1.1} onClick={this.props.requestLogout}>Log Out</MenuItem>
                        </NavDropdown>
                    ) : null}
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    }
}