import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'react-bootstrap';
//import { Col, Container, Row } from 'react-bootstrap';

type DetailsProps = {
  title: string;
  img: string;
  description: string;
  rules: string;
};

function ActivityDetails({title, img, description, rules}: DetailsProps) {
  return (
    <div>
      <h1>{title}</h1>
      <br></br>
      <img src={img} alt="Image" />
      <h5>Beskrivelse</h5>
      <p>{description}</p>
      <br></br>
      <h5>Regler</h5>
      <p>{rules}</p>
      <br></br>
      <Button variant="primary">Tilbake</Button>
    </div>
  );

}


export default ActivityDetails;
