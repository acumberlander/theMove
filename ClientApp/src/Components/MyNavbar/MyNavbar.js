import React, { Component } from 'react'
// import { NavLink as RRNavLink } from 'react-router-dom';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    Nav,
    NavItem,
    NavLink
} from 'reactstrap';
import './MyNavbar.scss';

export default class MyNavbar extends Component {
    state = {
        isOpen: false,
      };

    toggle() {
        this.setState({
          isOpen: !this.state.isOpen
        });
      }
    
    render() {
        const buildNavbar = () => {
            return (
                <Nav className="ml-auto" navbar>
                    <NavItem className="newAppointment">
                        <NavLink to="/"></NavLink>
                    </NavItem>
                </Nav>
            );
        }

        const linkLocation = '/';
        return (
            <div>
               <Navbar className="navbar" expand="md">
                    <div className="navLogo">
                    <a id="theMoveLogo" href={linkLocation}>The Move</a>
                    </div>
                    <NavbarToggler className="navToggle" onClick={e => this.toggle(e)} />
                    <Collapse isOpen={this.state.isOpen} navbar>
                        {buildNavbar()}
                    </Collapse>
                </Navbar>
            </div>
        )
    }
}
