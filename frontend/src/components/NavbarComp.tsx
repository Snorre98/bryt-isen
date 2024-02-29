import { Button, Nav, Navbar } from 'react-bootstrap';

//import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuthContext } from '~/contextProviders/AuthContextProvider';
import { logout } from '~/api';
import { useEffect, useRef, useState } from 'react';
import navImage from '../assets/bryt-isen-logo-blue-notext.png';
import '../styles/NavBar.css';
import { UserDto } from '~/dto';

function NavbarComp() {
  const { user, setUser } = useAuthContext();
  const prevUserRef = useRef<UserDto | undefined>(undefined);
  const [userGradient, setUserGradient] = useState('');

  useEffect(() => {
    if (user?.username !== prevUserRef.current?.username) {
      const gradient = randomGradient();
      setUserGradient(gradient);
      prevUserRef.current = user;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);
  const HTTP_200_OK: number = 200;

  const handleLogout = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    logout()
      .then((response) => {
        response.status === HTTP_200_OK && setUser(undefined);
        // window.location.reload();
      })
      .catch(console.error);
  };

  const HEXT_STRING = '0123456789abcdef';

  const randomColor = () => {
    let hexCode = '#';
    for (let i = 0; i < 6; i++) {
      hexCode += HEXT_STRING[Math.floor(Math.random() * HEXT_STRING.length)];
    }
    return hexCode;
  };

  const randomGradient = () => {
    const gradientKey = `localUserGradient_${user?.username || 'default'}`;
    let savedGradient = localStorage.getItem(gradientKey);

    if (!savedGradient) {
      const firstColor = randomColor();
      const secondColor = randomColor();
      const angle = Math.floor(Math.random() * 360);
      savedGradient = `linear-gradient(${angle}deg, ${firstColor}, ${secondColor})`;
      localStorage.setItem(gradientKey, savedGradient);
    }
    return savedGradient;
  };

  const userChip = (
    <div className="userChip">
      <div className="userChipIcon" style={{ background: userGradient }} />
      {user?.username}
    </div>
  );

  const logOut = (
    <Button variant="primary" className="btn btn-warning" onClick={handleLogout}>
      Logg ut
    </Button>
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
        {user && userChip}
        {user && logOut}
      </Navbar.Collapse>
    </Navbar>
  );
}

export default NavbarComp;
