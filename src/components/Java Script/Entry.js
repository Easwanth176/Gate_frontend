import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../CSS/Entry.css";
import { Navbar, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

const navLinkStyle = {
  fontSize: "19px",
};

export default function MyNavbar() {
  const handleLinkClick = () => {
    const navbarToggler = document.querySelector(".navbar-toggler");
    if (navbarToggler) {
      navbarToggler.click();
    }
  };

  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand href="/">Gate Preparation</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Link
            to="/"
            className="nav-link"
            style={navLinkStyle}
            onClick={handleLinkClick}
          >
            Home
          </Link>
          <Link
            to="/video"
            className="nav-link"
            style={navLinkStyle}
            onClick={handleLinkClick}
          >
            Videos
          </Link>
          <Link
            to="/notes"
            className="nav-link"
            style={navLinkStyle}
            onClick={handleLinkClick}
          >
            Notes
          </Link>
          <Link
            to="/mock"
            className="nav-link"
            style={navLinkStyle}
            onClick={handleLinkClick}
          >
            Mock Test
          </Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}