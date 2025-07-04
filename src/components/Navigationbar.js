import React, { useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { delAuth, initAuth } from "../redux/actions";
import axios from "axios";
import { URL } from "../config";

import { Navbar, Nav, NavItem } from "react-bootstrap";

export function Navigationbar(props) {
  let history = useHistory();

  const dispatch = useDispatch();
  useEffect(() => {
    const authToken = localStorage.getItem("token");
    axios
      .post(
        `${URL}post/isAuthenticated`,
        { token: "not needed here" },
        { headers: { Authorization: authToken } }
      )
      .then((res) => {
        console.log(res);
        if (res.data.code === "tokenValid") {
          console.log("res.data message: " + JSON.stringify(res.data.message));
          dispatch(initAuth(res.data.message));
        }
      })
      .catch((err) => {
        console.log("Error from isValidAuthToken " + err);
      });
  }, [dispatch]);

  const auth = useSelector((state) => state.auth);

  const handleLogout = () => {
    localStorage.setItem("token", null);
    dispatch(delAuth());
    history.push("/login");
  };

  return (
    <Navbar
      variant="light"
      expand="lg"
      className="navbar"
    >
      <Navbar.Brand className="navbar-header">
        <Link
          to="/"
          className="navbar-brand-link"
          component={Nav.Link}
        >
          Sayantan's Webapps
        </Link>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-nav-bar" className="navbar-collapse">
        <Nav className="ml-auto">
          <NavItem>
            <Nav.Link to="/" as={Link}>
              Home
            </Nav.Link>
          </NavItem>
          <NavItem>
            <Nav.Link to="/news" as={Link}>
              News
            </Nav.Link>
          </NavItem>
          <NavItem>
            <Nav.Link to="/stocks" as={Link}>
              Stock Suggestions
            </Nav.Link>
          </NavItem>
          {!auth.isLoggedIn && (
            <NavItem>
              <Nav.Link to="/signup" as={Link}>
                Signup
              </Nav.Link>
            </NavItem>
          )}
          {!auth.isLoggedIn && (
            <NavItem>
              <Nav.Link to="/login" as={Link}>
                Login
              </Nav.Link>
            </NavItem>
          )}
          {auth.isLoggedIn && (
            <NavItem>
              <Nav.Link to="/write" as={Link}>
                Rewrite
              </Nav.Link>
            </NavItem>
          )}
          {auth.isLoggedIn && (
            <NavItem>
              <Nav.Link to="/instagram" as={Link}>
                Instagram Fetcher
              </Nav.Link>
            </NavItem>
          )}
          {auth.isLoggedIn && (
            <NavItem>
              <Nav.Link to="/warehouse" as={Link}>
                Warehouse
              </Nav.Link>
            </NavItem>
          )}
          {auth.isLoggedIn && (
            <NavItem>
              <Nav.Link onClick={() => handleLogout()} as={Link}>
                Logout
              </Nav.Link>
            </NavItem>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}
