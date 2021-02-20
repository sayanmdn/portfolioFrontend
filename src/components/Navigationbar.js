import React from "react";
import { Link } from "react-router-dom";
import {useSelector, useDispatch} from 'react-redux'
import {delAuth} from '../redux/actions'

import { Navbar, Nav, NavItem } from "react-bootstrap";

export function Navigationbar(props) {
  
  const auth = useSelector(state => state.auth)
  const dispatch = useDispatch() 

  const handleLogout = () =>{
    localStorage.setItem('token', null)
    dispatch(delAuth())
  }

  return (
    <Navbar
      variant="dark"
      expand="lg"
      style={{ background: "#112233", color: "white" }}
    >
      <Navbar.Brand className="navbar-header">
        <Link to="/" style={{ color: "#bbb", marginLeft: "100px" }} component={Nav.Link}>
          Sayantan's Portfolio
        </Link>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-nav-bar" style={{ marginRight: "100px" }}>
        <Nav className="ml-auto">
          <NavItem>
            <Link to="/" component={Nav.Link}>
              Home
            </Link>
          </NavItem>
            {
              !auth.isLoggedIn &&
          <NavItem>
            <Link to="/signup" component={Nav.Link}>
              Signup
            </Link>
          </NavItem>
}
{         !auth.isLoggedIn &&
          <NavItem>
              <Link to="/login" component={Nav.Link}>
              Login
              </Link>
          </NavItem>
}
{
          auth.isLoggedIn &&
          <NavItem>
            <Link to="/warehouse" component={Nav.Link}>
              Warehouse
            </Link>
          </NavItem>
}
{          auth.isLoggedIn &&
          <NavItem>
            <Link onClick={()=>handleLogout()} component={Nav.Link}>
              Logout
            </Link>
          </NavItem>
}
          <NavItem>
            <Link to="/contact" component={Nav.Link}>
              Contact
            </Link>
          </NavItem>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}
