import React from "react";
import { useHistory, Link } from "react-router-dom";

import { Navbar, Nav, NavItem } from "react-bootstrap";

export function Navigationbar(props) {
  const history = useHistory();
  const handleckick = (e) => {
    history.push("/signup");
  };

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
          <NavItem>
            <Link to="/login" component={Nav.Link}>
              Login
            </Link>
          </NavItem>

          <NavItem>
            <Link to="/signup" component={Nav.Link}>
              Signup
            </Link>
          </NavItem>
          <NavItem>
            <Link to="/warehouse" component={Nav.Link}>
              Warehouse
            </Link>
          </NavItem>
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
