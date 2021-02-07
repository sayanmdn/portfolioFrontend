import React from 'react'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'


export function Navigationbar(props) {
    

    return (
        <div>
            <Navbar variant="dark" expand="lg" style={{background:"#112233", color: "white"}}>
                <Navbar.Brand className="navbar-header"><Nav.Link href="#" style={{color:"#bbb", marginLeft:"100px"}}>Sayantan's Portfolio</Nav.Link></Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                <Navbar.Collapse id="basic-nav-bar" style={{marginRight:"100px"}}>
                    <Nav className="ml-auto">
                        <Nav.Item ><Nav.Link href="/">Home</Nav.Link></Nav.Item>
                        <Nav.Item ><Nav.Link href="/login">Login</Nav.Link></Nav.Item>
                        <Nav.Item ><Nav.Link href="/signup">Signup</Nav.Link></Nav.Item>
                        <Nav.Item ><Nav.Link href="/">About</Nav.Link></Nav.Item>
                        <Nav.Item ><Nav.Link href="/">Contact</Nav.Link></Nav.Item>

                    </Nav>
                </Navbar.Collapse>
            </Navbar>

        </div>
    )
}
