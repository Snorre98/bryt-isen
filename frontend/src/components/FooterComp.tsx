import { Navbar } from 'react-bootstrap';
import '../styles/NavBar.css';

function FooterComp() {
  return (
    <Navbar
      className="justify-content-md-center"
      style={{ position: 'relative', bottom: '0', width: '100%', height: '50px' }}
    >
      <Navbar.Brand href="#home" className="text-center">
        © 2024 Copyright: Bryt Isen
      </Navbar.Brand>
    </Navbar>
  );
}

export default FooterComp;
