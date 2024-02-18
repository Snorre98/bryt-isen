import { useState } from 'react';
import { Button, Card, Modal } from 'react-bootstrap';

export type DetailsCardProps = {
  key: string;
  title: string;
  img: string;
  description: string;
  rules: string;
};

export default function CardComp({ title, img, description, rules }: DetailsCardProps) {

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  return (
    <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src={img} />
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text>
          {description}
        </Card.Text>
        <Button variant="primary" onClick={handleShow}>
          Beskrivelse
        </Button>

        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>{title}</Modal.Title>
          </Modal.Header>
          <Modal.Body><p style={{ fontSize: '20px', fontWeight: 'bold' }}>Beskrivelse</p></Modal.Body>
          <Modal.Body>{description}</Modal.Body>
          <Modal.Body><p style={{ fontSize: '20px', fontWeight: 'bold' }}>Regler</p></Modal.Body>
          <Modal.Body>{rules}</Modal.Body>
          <img src={img} alt="Image" />
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal>
      </Card.Body>
    </Card>
  );
}
