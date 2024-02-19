import { useEffect, useState } from 'react';
import { Button, Card, Modal } from 'react-bootstrap';
import { useAuthContext } from '~/contextProviders/AuthContextProvider';

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

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const { user, setUser } = useAuthContext();

  useEffect(() => {
    if (user) {
      setUser(user);
    }
  }, [user, setUser]);

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

          <h4 style={{ fontWeight: '600', margin: '0.5rem' }}>Beskrivelse</h4>
          <p style={{ margin: '1rem' }}>{description}</p>

          <h4 style={{ fontWeight: '600', margin: '0.5rem' }}>Regler</h4>
          <p style={{ margin: '1rem' }}>{rules}</p>

          <h6 style={{ fontWeight: '600', margin: '0.5rem' }}>Kategori</h6>
          <p style={{ margin: '1rem' }}>{activity_type}</p>

          <img src={img} alt="Image" style={{ border: '1px solid #e4e4e4', width: '95%', alignSelf: 'center' }} />
          {user && (
            <Button
              variant="outline-warning"
              onClick={() => {
                alert('Dette virker ikke enda!');
              }}
            >
              Edit
            </Button>
          )}
          <Button variant="info" onClick={handleClose} style={{ borderRadius: '0' }}>
            Close
          </Button>
        </Modal>
      </Card.Body>
    </Card>
  );
}
