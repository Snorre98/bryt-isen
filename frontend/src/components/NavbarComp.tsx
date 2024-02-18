import { Container, Nav, Navbar } from 'react-bootstrap';

import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/NavBar.css';
import navImage from '../assets/bryt-isen-logo-blue-notext.png';

function NavbarComp() {
  return (
    <Navbar className="navbarContainer" expand="lg">
      <Navbar.Brand href="/">
        <img id="logo" src={navImage} alt="" />
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
          <Nav.Link as={Link} to="/">
            Hjem
          </Nav.Link>
          <Nav.Link as={Link} to="/activityForm">
            Opprett aktivitet
          </Nav.Link>
        </Nav>
        <Nav>
          <Nav.Link as={Link} to="/login">
            Logg inn
          </Nav.Link>
          <Nav.Link as={Link} to="/signup">
            Ny bruker
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default NavbarComp;
