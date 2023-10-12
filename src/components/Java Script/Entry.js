import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../CSS/Entry.css";

import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom"; 


const navLinkStyle = {
  fontSize: '17px',
};

export default function MyNavbar() {
  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand href="https://gate.iitkgp.ac.in/">
        Gate Preparation
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Link to="/Body" className="nav-link" style={navLinkStyle}>
            Home
          </Link>
          <Link to="/Video" className="nav-link" style={navLinkStyle}>
          video
          </Link>
          <Nav.Link href="#" style={navLinkStyle}>
            Documents
          </Nav.Link>
          <Nav.Link href="#" style={navLinkStyle}>
            Test
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}
