import { Navbar } from 'react-bootstrap'

function FooterComp() {

   return(
    <Navbar
    fixed="bottom"
    bg="dark"
    variant="dark"
    className="justify-content-md-center"
  >
    <Navbar.Brand href="#home" className="text-center">
     © 2024 Copyright: Bryt Isen
    </Navbar.Brand>
  </Navbar>
   )
}

export default FooterComp