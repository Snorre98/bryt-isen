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
    <Card style={{ width: '18rem', boxShadow: '0px 0px 5px #c4c4c4' }}>
      <Card.Img variant="top" src={img} style={{ objectFit: 'cover', height: '10rem' }} />
      <Card.Body>
        <Card.Title>
          <h4>{title}</h4>
          <hr />
        </Card.Title>
        <Card.Text style={{ marginLeft: '0.5rem' }}>{description}</Card.Text>
        <Button variant="primary" onClick={handleShow}>
          Se mer
        </Button>

        <Modal show={show} onHide={handleClose} style={{ overflow: 'hidden' }}>
          <Modal.Header closeButton>
            <Modal.Title>
              <h2>{title}</h2>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p style={{ fontSize: '20px', fontWeight: 'bold' }}>Beskrivelse</p>
          </Modal.Body>
          <Modal.Body>{description}</Modal.Body>
          <Modal.Body>
            <p style={{ fontSize: '20px', fontWeight: 'bold' }}>Regler</p>
          </Modal.Body>
          <Modal.Body>{rules}</Modal.Body>
          <img src={img} alt="Image" style={{ border: '1px solid #e4e4e4', width: '95%', alignSelf: 'center' }} />
          <Button variant="info" onClick={handleClose} style={{ borderRadius: '0' }}>
            Close
          </Button>
        </Modal>
      </Card.Body>
    </Card>
  );
}
