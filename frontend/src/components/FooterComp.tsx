import { Navbar } from 'react-bootstrap';
import '../styles/NavBar.css';

function FooterComp() {
  return (
    <Navbar fixed="bottom" className="justify-content-md-center">
      <Navbar.Brand href="#home" className="text-center">
        © 2024 Copyright: Bryt Isen
      </Navbar.Brand>
    </Navbar>
  );
}

export default FooterComp;
