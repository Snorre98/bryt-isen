import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';

type DetailsProps = {
  title: string;
  img: string;
  description: string;
  rules: string;
};

function ActivityDetails({title, img, description, rules}: DetailsProps) {

  const [show, setShow] = useState(false);
  
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

  return (
      <>
        <Button variant="primary" onClick={handleShow}>
          Beskrivelse
        </Button>
  
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>{title}</Modal.Title>
          </Modal.Header>
          <Modal.Body><p style={{fontSize: '20px', fontWeight: 'bold'}}>Beskrivelse</p></Modal.Body>
          <Modal.Body>{description}</Modal.Body>
          <Modal.Body><p style={{fontSize: '20px', fontWeight: 'bold'}}>Regler</p></Modal.Body>
          <Modal.Body>{rules}</Modal.Body>
          <img src={img} alt="Image" />
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
        </Modal>
      </>
  );

}

export default ActivityDetails;
