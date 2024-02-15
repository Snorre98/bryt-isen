import { Container, Nav, Navbar } from 'react-bootstrap';

import React from 'react';
import { Link } from 'react-router-dom';

function NavbarComp() {
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container fluid>
        <Navbar.Brand as={Link} to="/">🧊⛏️Bryt Isen</Navbar.Brand>
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
      </Container>
    </Navbar>
  );
}

export default NavbarComp;
