import { Container, Nav, Navbar } from 'react-bootstrap'

function NavbarComp() {
   
   return(
      <Navbar expand="lg" className="bg-body-tertiary">
         <Container fluid>
         <Navbar.Brand href="#home">🧊⛏️Bryt Isen</Navbar.Brand>
         <Navbar.Toggle aria-controls="basic-navbar-nav" />
         <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
               <Nav.Link href="#home">Hjem</Nav.Link>
               <Nav.Link href="#link">Opprett aktivitet</Nav.Link>
            </Nav>
         </Navbar.Collapse>
         </Container>
      </Navbar>
   )
}

export default NavbarComp