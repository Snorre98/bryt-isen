import { Button, Nav, Navbar } from 'react-bootstrap';

//import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuthContext } from '~/contextProviders/AuthContextProvider';
import { logout } from '~/api';
import { useEffect } from 'react';
import navImage from '../assets/bryt-isen-logo-blue-notext.png';
import '../styles/NavBar.css';

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
        <h4 style={{ margin: '1rem', color: '#ffc107', fontWeight: 'bolder' }}>{user?.username}</h4>
      </Nav>
      <Button variant="primary" className="btn btn-warning" onClick={handleLogout}>
        Logg ut
      </Button>
    </>
  );

  const logIn = !user && (
    <Nav.Link as={Link} to="/login">
      Logg inn
    </Nav.Link>
  );
  const newUser = !user && (
    <Nav.Link as={Link} to="/signup">
      Ny bruker
    </Nav.Link>
  );
  return (
    <Navbar className="navbarContainer" expand="lg">
      <Navbar.Brand as={Link} to="/">
        <img id="logo" src={navImage} alt="" />
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
          <Nav.Link as={Link} to="/">
            Hjem
          </Nav.Link>
          {user && (
            <Nav.Link as={Link} to="/activityForm">
              Opprett aktivitet
            </Nav.Link>
          )}
        </Nav>
        <Nav>
          {logIn}
          {newUser}
        </Nav>
        {user && logedInUser}
      </Navbar.Collapse>
    </Navbar>
  );
}

export default NavbarComp;
