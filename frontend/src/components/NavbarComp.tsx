import { Button, Container, Nav, Navbar } from 'react-bootstrap';

//import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuthContext } from '~/contextProviders/AuthContextProvider';
import { logout } from '~/api';
import { useEffect } from 'react';

function NavbarComp() {
  const { user, setUser } = useAuthContext();

  useEffect(() => {
    setUser(user);
  }, [user, setUser]);

  const HTTP_200_OK: number = 200;

  const handleLogout = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    logout()
      .then((response) => {
        response.status === HTTP_200_OK && setUser(undefined);
      })
      .catch(console.error);
  };

  const logedInUser = (
    <>
      <Nav>
        <h4 style={{ margin: '1rem', color: 'blue' }}>{user?.username}</h4>
      </Nav>
      <Button variant="primary" onClick={handleLogout}>
        Logg ut
      </Button>
    </>
  );

  const logIn = (
    <Nav.Link as={Link} to="/login">
      {user === undefined ? 'Logg inn' : 'Bytt bruker'}
    </Nav.Link>
  );
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container fluid>
        <Navbar.Brand href="#home">🧊⛏️Bryt Isen</Navbar.Brand>
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
            {logIn}
            <Nav.Link as={Link} to="/signup">
              Ny bruker
            </Nav.Link>
          </Nav>
          {user && logedInUser}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavbarComp;
