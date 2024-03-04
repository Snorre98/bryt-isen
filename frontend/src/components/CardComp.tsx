import { useEffect, useState } from 'react';
import { Button, Card, Form, InputGroup, Modal } from 'react-bootstrap';
import { useAuthContext } from '~/contextProviders/AuthContextProvider';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ActivityDto } from '../dto';
import { putActivity } from '~/api';
import { CustomToast } from '~/components/CustomToast';
import ReviewComp from './ReviewComp';
import ReviewForm from './ReviewForm';
import profileImg from '../assets/download.jpeg';
import Countdown from 'react-countdown';
import React from 'react';


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
  const [showReviewForm, setShowReviewForm] = useState(false); // State to manage review form visibility
  const [visTimer, setVisTimer] = useState(false);

  const [timerHours, setTimerHours] = useState(0);
  const [timerMinutes, setTimerMinutes] = useState(0);
  const [timerSeconds, setTimerSeconds] = useState(0);

  const [seconds, setSeconds] = React.useState(0);

  const intervalRef = React.useRef(null);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const { user } = useAuthContext();

  const [showToast, setShowToast] = useState(false);

  const reportActivity = (event: any) => {
    console.log(id);

    const data: Partial<ActivityDto> = {
      isReported: true,
    };

    putActivity(id, data)
      .then((response) => {
        if (response.status === 200) {
          console.log('Rapportert');
          setShowToast(true);
        }
      })
      .catch((error: any) => {
        console.log(error);
        throw new Error(error);
      });
  };

  // Function to handle opening review form modal
  const handleReviewFormOpen = () => {
    setShow(false); // Close details modal if open
    setShowReviewForm(true); // Open review form modal
  };

  const handleVisTimer = () => {
    setVisTimer(true);
  }

  const handleStartTimer = () => {
    // Clear any existing interval
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  
    setSeconds(timerSeconds + timerMinutes * 60 + timerHours * 3600);
  
    // Start a new interval
    intervalRef.current = setInterval(() => {
      setSeconds((prevSeconds) => {
        if (prevSeconds <= 1) {
          clearInterval(intervalRef.current);
          return 0;
        }
        return prevSeconds - 1;
      });
    }, 1000);
  };

  React.useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  function formatSecondsAsText(seconds: number): string {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;
  
    let parts: string[] = [];
    if (hours > 0) {
      parts.push(`${hours} time${hours > 1 ? 'r' : ''}`);
    }
    if (minutes > 0) {
      parts.push(`${minutes} minutt${minutes > 1 ? 'er' : ''}`);
    }
    if (remainingSeconds > 0 || (hours === 0 && minutes === 0)) {
      parts.push(`${remainingSeconds} sekund${remainingSeconds > 1 ? 'er' : ''}`);
    }
  
    return parts.join(', ').replace(/, ([^,]*)$/, ' og $1'); // Replace the last comma with ' og '
  }
  

  return (
    <>
      <Card style={{ width: '18rem', boxShadow: '0px 0px 5px #c4c4c4', maxHeight: '350px' }}>
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
              {user && (
                <>
                  <Button onClick={handleReviewFormOpen}>Legg til anmeldelse</Button>
                </>
              )}
              {!visTimer ? <><br /><Button onClick={handleVisTimer}>Timer</Button></> : null}
              {visTimer ? <>
                <InputGroup className="mt-4">
                  <InputGroup.Text>Timer</InputGroup.Text>
                  <Form.Control
                    placeholder=""
                    aria-label="Timer"
                    aria-describedby="basic-addon1"
                    onChange={(e) => setTimerHours(Number(e.target.value))}
                  />
                  <InputGroup.Text>Minutter</InputGroup.Text>
                  <Form.Control
                    placeholder=""
                    aria-label="Minutter"
                    aria-describedby="basic-addon2"
                    onChange={(e) => setTimerMinutes(Number(e.target.value))}
                  />
                  <InputGroup.Text>Sekunder</InputGroup.Text>
                  <Form.Control
                    placeholder=""
                    aria-label="Sekunder"
                    aria-describedby="basic-addon3"
                    onChange={(e) => setTimerSeconds(Number(e.target.value))}
                  />
                </InputGroup>
                <button type="button" onClick={handleStartTimer} className="btn btn-primary btn-sm"> Start Timer</button>
                <p>{formatSecondsAsText(seconds)}</p>
              </>: <br /> }
              
              {user && (
                <>
                  <button type="button" onClick={reportActivity} className="btn btn-outline-secondary btn-sm">
                    Rapporter
                  </button>
                </>
              )}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body style={{ maxHeight: 'calc(95vh - 200px)', overflow: 'auto' }}>
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
            <ReviewComp
              username={'roar'}
              rating={5}
              review_description={
                'dette var gøyiuwedfi uguwv  e fuy wgefuywefgwueyf guwyegfuy wegfuywgf uywegfu wehfuiwe wefbdwe de altså!!'
              }
              img={profileImg}
            />
            <ReviewComp username={'knut'} rating={3} review_description={'dette var kjedelig!'} img={profileImg} />
          </Modal.Body>
        </Modal>
        <CustomToast
          toastTitle="Rapportert"
          toastMessage="Aktiviteten ble rapportert"
          variant="warning"
          setToastState={setShowToast}
          toastState={showToast}
        />
        {/* Review Form Modal */}
        <Modal show={showReviewForm} onHide={() => setShowReviewForm(false)}>
          <ReviewForm activity_title={title} />
        </Modal>
      </Card>
    </>
  );
}
