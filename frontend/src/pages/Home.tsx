import 'bootstrap/dist/css/bootstrap.min.css';
import { Col, Container, Row } from 'react-bootstrap';
import img2 from '../assets/Metrobuss_Trondheim-190805.jpg';
import img from '../assets/chess-drinking.jpg';
import img1 from '../assets/download.jpeg';
import CardComp from "../components/CardComp";


function Home() {
  return (
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


  );
}

export default Home;