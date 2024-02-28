import { useEffect, useState } from 'react';
import { Button, Card, Modal } from 'react-bootstrap';
import { useAuthContext } from '~/contextProviders/AuthContextProvider';
import ReviewForm from './ReviewForm';

export type DetailsCardProps = {
  key: string;
  title: string;
  img: string;
  description: string;
  rules: string;
  activity_type: string;
};

export default function CardComp({ title, img, description, rules, activity_type }: DetailsCardProps) {
  const [show, setShow] = useState(false);
  const [showReviewForm, setShowReviewForm] = useState(false); // State to manage review form visibility

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const { user } = useAuthContext();

  // Function to handle opening review form modal
  const handleReviewFormOpen = () => {
    setShow(false); // Close details modal if open
    setShowReviewForm(true); // Open review form modal
  };

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
      </Card.Body>
      <Modal show={show} onHide={handleClose} style={{ overflow: 'hidden', height: '95vh' }}>
        <Modal.Header closeButton>
          <Modal.Title>
            <h2>{title}</h2>
          </Modal.Title>
        </Modal.Header>
        <div style={{ padding: '1rem' }}>
          <h5 style={{ fontWeight: '600', margin: '0.5rem' }}>Beskrivelse</h5>
          <p style={{ margin: '1rem' }}>{description}</p>

          <h5 style={{ fontWeight: '600', margin: '0.5rem' }}>Regler</h5>
          <p style={{ margin: '1rem' }}>{rules}</p>

          <h6 style={{ fontWeight: '600', margin: '0.5rem' }}>Kategori</h6>
          <p style={{ margin: '1rem' }}>{activity_type}</p>
          <div
            style={{
              height: '20%',
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              overflow: 'hidden',
            }}
          >
            <img
              src={img}
              alt="Image"
              style={{
                border: '1px solid #e4e4e4',
                height: '10%',
                width: '80%',
                objectFit: 'contain',
                justifySelf: 'center',
                borderRadius: '0.375rem',
              }}
            />
          </div>
        </div>
        {/* {user && (
          <Button variant="outline-warning" onClick={() => alert('Dette virker ikke enda!')}>
            Edit
          </Button>
        )} */}
        {user && (
          <Button onClick={handleReviewFormOpen}>Legg til anmeldelse</Button> // Button to open review form
        )}
      </Modal>
      {/* Review Form Modal */}
      <Modal show={showReviewForm} onHide={() => setShowReviewForm(false)}>
        <ReviewForm />
      </Modal>
    </Card>
  );
}
