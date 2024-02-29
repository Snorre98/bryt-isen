import { useEffect, useState } from 'react';
import { Button, Card, Modal } from 'react-bootstrap';
import { useAuthContext } from '~/contextProviders/AuthContextProvider';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ActivityDto } from '../dto';
import { putActivity } from '~/api';
import { CustomToast } from '~/components/CustomToast';

export type DetailsCardProps = {
  id: number;
  title: string;
  img: string;
  description: string;
  rules: string;
  activity_type: string;
};

export default function CardComp({ id, title, img, description, rules, activity_type }: DetailsCardProps) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const { user, setUser } = useAuthContext();

  const [showToast, setShowToast] = useState(false);

  const reportActivity = (event: any) => {
    console.log(id)

    const data: Partial<ActivityDto> = {
      isReported : true
    };

    putActivity(id,data)
      .then((response) => {
        if (response.status === 200) {
          console.log("Rapportert")
          setShowToast(true)
        }
      })
      .catch((error:any) => {
        console.log(error)
        throw new Error(error);
      });
  }

  useEffect(() => {
    if (user) {
      setUser(user);
    }
  }, [user, setUser]);

  return (
    <>
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
            <h2>{title}</h2>{user && (
            <button type="button" onClick={reportActivity} className="btn btn-outline-secondary btn-sm">Rapporter</button>
          )}
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
                // alignSelf: 'center',
                height: '10%',
                width: '80%',
                objectFit: 'contain',
                justifySelf: 'center',
                borderRadius: '0.375rem',
              }}
            />
          </div>
          {/* <Button variant="info" onClick={handleClose} style={{ width: '100%' }}>
            Close
          </Button> */}
        </div>
        {/*//TODO: ADD EDIT BUTTON*/}
        {/* {user && (
            <Button
              variant="outline-warning"
              onClick={() => {
                alert('Dette virker ikke enda!');
              }}
            >
              Edit
            </Button>
          )} */}
      </Modal>
      <CustomToast
      toastTitle="Rapportert"
      toastMessage="Aktiviteten ble rapportert"
      variant="warning"
      setToastState={setShowToast}
      toastState={showToast}
      />
    </Card>
    </>
    
  );
}
