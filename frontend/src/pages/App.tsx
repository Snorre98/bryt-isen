import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Col, Container, Row } from 'react-bootstrap';
import CardComp from "../components/CardComp";
import FooterComp from "../components/FooterComp";
import NavbarComp from "../components/NavbarComp";

import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { LinkContainer } from 'react-router-bootstrap';


//import Login from "./pages/NoPage";

function App() {

  return (
    <>
      <Container fluid>
         
        <NavbarComp></NavbarComp>
        <Container className='mt-4'>
          <Row className="justify-content-md-center">
            <Col>
              <CardComp></CardComp>
            </Col>
            <Col>
              <CardComp></CardComp>
            </Col>
            <Col>
              <CardComp></CardComp>
            </Col>
          </Row>
        </Container>
        <FooterComp></FooterComp>
      </Container>
    </>
  )
}

export default App
