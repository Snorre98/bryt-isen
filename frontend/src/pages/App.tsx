import 'bootstrap/dist/css/bootstrap.min.css';
import { Col, Container, Row } from 'react-bootstrap';
import CardComp from "../components/CardComp";
import FooterComp from "../components/FooterComp";
import NavbarComp from "../components/NavbarComp";
import img from '../assets/chess-drinking.jpg'
import img1 from '../assets/download.jpeg'
import img2 from '../assets/Metrobuss_Trondheim-190805.jpg'

function App() {

  return (
    <>
      <Container fluid> 
        <NavbarComp></NavbarComp>
        <Container className='mt-4'>
          <Row className="justify-content-md-center">
            <Col>
              <CardComp title={'Thunderstruck'} img={img1} description={'ACDC sang'} rules={''}></CardComp>
            </Col>
            <Col>
              <CardComp title={'Bussruten'} img={img2} description={'Kortspill med bussrute'} rules={''}></CardComp>
            </Col>
            <Col>
              <CardComp title={'Lambo'} img={img} description={'Fadderperioden i Trondheim'} rules={''}></CardComp>
            </Col>
          </Row>
        </Container>
        <FooterComp></FooterComp>
      </Container>
    </>
  )
}

export default App
