import { useEffect, useRef, useState } from 'react';
import { Button, Card, Form, InputGroup, Modal } from 'react-bootstrap';
import { useAuthContext } from '~/contextProviders/AuthContextProvider';
import 'bootstrap/dist/css/bootstrap.min.css';
import { CustomToast } from '~/components/CustomToast';
import ReviewComp from './ReviewComp';
import ReviewForm from './ReviewForm';
import { deleteActivity, getReportedActivityByActId, postReportedActivity, postReportReview } from '~/api';
import { ReportedActivityDto, ReviewDto } from '~/dto';
import { useNavigate } from 'react-router-dom';
import { useReviewsContext } from '~/contextProviders/ReviewContextProvider';
import { UserChip } from '~/components/UserChipComponent/UserChip';
import FavoriteButton from './FavoriteButton';
import { Icon } from '@iconify/react';

export type DetailsCardProps = {
  id: number;
  title: string;
  img: string | File;
  description: string;
  rules: string;
  activity_type: string;
  owner: number;
  owner_username: string;
  owner_profile_gradient: string;
};

export default function CardComp({
  id,
  title,
  img,
  description,
  rules,
  activity_type,
  owner,
  owner_username,
  owner_profile_gradient,
}: DetailsCardProps) {
  const [show, setShow] = useState(false);
  const [showReviewForm, setShowReviewForm] = useState(false); // State to manage review form visibility
  const { user } = useAuthContext();
  const { reviews } = useReviewsContext();
  const [visTimer, setVisTimer] = useState(false);
  const [visStart, setVisStart] = useState(true);
  const [visStop, setVisStop] = useState(false);
  const [visStartIgjen, setStartIgjen] = useState(false);
  const [visReset, setReset] = useState(false);

  const [isActReported, setIsActReported] = useState<boolean>();
  const [actReportCount, setActReportCount] = useState<number>(0);
  const [timerHours, setTimerHours] = useState(0);
  const [timerMinutes, setTimerMinutes] = useState(0);
  const [timerSeconds, setTimerSeconds] = useState(0);

  const [seconds, setSeconds] = useState(0);

  const intervalRef = useRef(null);

  const navigate = useNavigate();
  const handleClose = () => setShow(false);
  const handleShow = () => {
    setShow(true);
  };

  const [showToast, setShowToast] = useState(false);
  const [toastTitle, setToastTitle] = useState('');
  const [toastMsg, setToastMsg] = useState('');
  const [submitStatus, setSubmitStatus] = useState('');

  //const RAPPORT_ERROR_MSG = "Kunne ikke rapportere"
  //const RAPPORT_SUCCESS_MSG = "Aktivitet ble rapportert"

  const DELETE_SUCCESS_MSG = 'Aktivitet ble slettet!';
  const DELETE_ERROR_MSG = 'Aktivitet kunne ikke slettes, noe gikk feil!';

  //const REPORT_REVIEW_SUCCESS = "Vurdering ble rapportert!"
  //const REPORT_REVIEW_ERROR = "Vurdering ble ikke rapportert!"
  /*
  const handleReportActivity = (activity_id: number) => {
    postReportedActivity(activity_id)
      .then(() => {
        setVisReport(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };*/

  useEffect(() => {
    if (id) {
      getReportedActivityByActId(id)
        .then((reports: ReportedActivityDto[]) => {
          setActReportCount(reports.length);
          setIsActReported(reports.length > 0);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [id]);

  const handleReportActivity = (activity_id: number) => {
    if (id) {
      postReportedActivity(activity_id)
        .then(() => {
          setIsActReported(true); // Update reported status
          setActReportCount((prevCount) => prevCount + 1); // Increment report count
          setActivityReportModal(false); // Close the modal
        })
        .catch((error) => {
          console.error('Error reporting the review: ', id, error);
        });
    }
  };

  const handleVisTimer = () => {
    setVisTimer(true);
  };

  const handleStartTimer = () => {
    if (timerHours === 0 && timerMinutes === 0 && timerSeconds === 0) {
      return; // Exit the function early
    }
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
    setVisStop(true);
    setVisStart(false);
    setReset(true);
  };

  const handleStopTimer = () => {
    clearInterval(intervalRef.current);
    setVisStop(false);
    setStartIgjen(true);
    setReset(true);
  };

  const handleStartIgjen = () => {
    // Sjekk om det allerede er en interval funksjon kjørende
    if (intervalRef.current) {
      clearInterval(intervalRef.current); // Stopper det eksisterende intervallet for å unngå flere intervaller som kjører samtidig
    }

    // Start intervallet på nytt uten å endre 'seconds'
    intervalRef.current = setInterval(() => {
      setSeconds((prevSeconds) => {
        if (prevSeconds <= 1) {
          clearInterval(intervalRef.current); // Stopper timeren når den når 0
          setVisStop(false); // Gjemmer "Stopp Timer"-knappen
          setStartIgjen(false); // Gjemmer "Start Igjen"-knappen siden timeren er fullført
          return 0; // Tilbakestiller 'seconds' til 0, eller du kan sette den til din opprinnelige timerverdi hvis du vil starte loop
        }
        return prevSeconds - 1;
      });
    }, 1000);

    // Viser "Stopp Timer"-knappen siden timeren kjører
    setVisStop(true);
    // Gjemmer "Start Igjen"-knappen mens timeren kjører
    setStartIgjen(false);
  };

  const handleReset = () => {
    setStartIgjen(false);
    setReset(false);
    setVisStart(true);
    setVisStop(false);
    setSeconds(0);
    setTimerHours(0);
    setTimerMinutes(0);
    setTimerSeconds(0);
  };

  useEffect(() => {
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

  const editActivityURL = (activity_id: number) => {
    if (activity_id !== undefined && activity_id !== null) {
      const url = '/editActivity/' + activity_id.toString();
      return url;
    } else {
      // Handle the case when id is undefined or null
      console.error('Invalid id:', activity_id);
      return ''; // or throw an error, or handle it in a way that makes sense for your application
    }
  };

  const isOwner = (): boolean => {
    if (user && user.id === owner) {
      return true;
    } else {
      return false;
    }
  };

  const [showActivityDeleteModal, setShowActivityDeleteModal] = useState<boolean>();
  const openActivityDeleteModal = () => setShowActivityDeleteModal(true);
  const closeActivityDeleteModal = () => setShowActivityDeleteModal(false);

  const [showActivityReportModal, setActivityReportModal] = useState<boolean>();

  const closeActivityReportModal = () => setActivityReportModal(false);
  const openActivityReportModal = () => setActivityReportModal(true);
  const handleDeleteActivity = (activity_id: number) => {
    setToastTitle('Slett aktivitet');
    deleteActivity(activity_id)
      .then(() => {
        setToastMsg(DELETE_SUCCESS_MSG);
        setSubmitStatus('success');
        setShowToast(true);
        closeActivityDeleteModal();
        setTimeout(() => {
          handleClose();
          location.reload();
        }, 500);
      })
      .catch((error) => {
        console.log(error);
        setToastMsg(DELETE_ERROR_MSG);
        setSubmitStatus('warning');
        setShowToast(true);
      });
  };
  return (
    <>
      <Card
        style={{
          width: '20rem',
          height: 'fit-content',
          maxHeight: '36rem',
          boxShadow: '0px 0px 5px #c4c4c4',
          overflow: 'hidden',
        }}
      >
        <Card.Img
          variant="top"
          src={img}
          style={{
            objectFit: 'cover',
            height: '10rem',
            overflow: 'hidden',
          }}
        />
        <Card.Body style={{ overflow: 'hidden' }}>
          <Card.Title>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
              <h4 style={{ alignSelf: 'start' }}>{title}</h4>
              <div style={{ alignSelf: 'end', display: 'block' }}>
                {user && <UserChip profile_gradient={owner_profile_gradient} username={owner_username} scale={0.75} />}
              </div>
            </div>

            <hr />
          </Card.Title>
          <Card.Text style={{ width: '18rem', height: '6rem', overflow: 'hidden' }}>
            <div
              style={{
                position: 'absolute',
                height: '6rem',
                width: '18rem',
                background: 'linear-gradient(180deg, rgba(255,255,255, 0) 60%, rgba(255,255, 255, 1) 100%)',
              }}
            />
            {description}
          </Card.Text>
          <div
            style={{
              width: '100%',
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              alignItems: 'center',
            }}
          >
            <Button variant="primary" onClick={handleShow}>
              Se mer
            </Button>
            {user && (
              <>
                <div style={{ justifySelf: 'end' }}>
                  <FavoriteButton activity_id={id}></FavoriteButton>
                </div>
              </>
            )}
          </div>
        </Card.Body>
      </Card>
      <Modal show={show} onHide={handleClose} style={{ overflow: 'hidden', height: '95vh' }} size="lg">
        <Modal.Header closeButton>
          <Modal.Title
            style={{
              display: 'grid',
              gridTemplateColumns: '2fr auto auto auto auto',
              alignItems: 'center',
              justifyContent: 'center',
              width: '100%',
              gap: '2rem',
            }}
          >
            <h2>{title}</h2>
            {isOwner() && (
              <>
                <Button variant="success" onClick={() => navigate(editActivityURL(id))} size="sm">
                  Endre
                </Button>{' '}
                {/* Add the edit button */}
                <Button variant="danger" onClick={openActivityDeleteModal} size="sm">
                  Slett
                </Button>
              </>
            )}
            {user && (
              <>
                <Button onClick={() => setShowReviewForm(true)} size="sm">
                  Ny vurdering
                </Button>
              </>
            )}
            {user && !isOwner() && (
              <Button onClick={openActivityReportModal} variant="warning" size="sm">
                Rapporter
              </Button>
            )}
            {isActReported && actReportCount > 0 ? (
              <div
                style={{
                  display: 'flex',
                  alignItems: 'end',
                  justifyContent: 'end',
                  border: '2px solid #ffc107',
                  borderRadius: '0.25rem',
                  padding: '0 0.15rem 0 0.10rem',
                }}
              >
                <Icon icon="ic:baseline-flag" width="32" height="32" color={'red'} />
                <span>: {actReportCount}</span>
              </div>
            ) : null}
          </Modal.Title>
        </Modal.Header>
        <Modal.Header style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem',
              justifyContent: 'flex-start',
              alignItems: 'flex-start',
            }}
          >
            {!visTimer ? (
              <>
                <Button
                  onClick={handleVisTimer}
                  style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                >
                  Timer
                  <Icon icon="ph:timer-bold" width="1.5rem" height="1.5rem" />
                </Button>
              </>
            ) : null}
            {visTimer ? (
              <>
                <InputGroup className="mt-4">
                  <InputGroup.Text>Timer</InputGroup.Text>
                  <Form.Control
                    value={timerHours}
                    placeholder=""
                    aria-label="Timer"
                    aria-describedby="basic-addon1"
                    onChange={(e) => setTimerHours(Number(e.target.value))}
                  />
                  <InputGroup.Text>Minutter</InputGroup.Text>
                  <Form.Control
                    value={timerMinutes}
                    placeholder=""
                    aria-label="Minutter"
                    aria-describedby="basic-addon2"
                    onChange={(e) => setTimerMinutes(Number(e.target.value))}
                  />
                  <InputGroup.Text>Sekunder</InputGroup.Text>
                  <Form.Control
                    value={timerSeconds}
                    placeholder=""
                    aria-label="Sekunder"
                    aria-describedby="basic-addon3"
                    onChange={(e) => setTimerSeconds(Number(e.target.value))}
                  />
                </InputGroup>
                {visStart && (
                  <button type="button" onClick={handleStartTimer} className="btn btn-primary btn-sm">
                    {' '}
                    Start Timer
                  </button>
                )}
                {visStop && (
                  <button type="button" onClick={handleStopTimer} className="btn btn-danger btn-sm ">
                    {' '}
                    Stop Timer
                  </button>
                )}
                {visStartIgjen && (
                  <button type="button" onClick={handleStartIgjen} className="btn btn-success btn-sm">
                    {' '}
                    Start Igjen
                  </button>
                )}
                {visReset && (
                  <button type="button" onClick={handleReset} className="btn btn-danger btn-sm m-2">
                    {' '}
                    Nullstill{' '}
                  </button>
                )}
                <p>{formatSecondsAsText(seconds)}</p>
              </>
            ) : null}
          </div>
          <div style={{ display: 'flex', flexDirection: 'row', gap: '1rem' }}></div>
        </Modal.Header>
        <Modal.Body
          style={{
            maxHeight: 'calc(95vh - 400px)',
            overflowX: 'hidden',
            overflowY: 'scroll',
            paddingBottom: '1rem',
          }}
        >
          <div style={{ padding: '1rem' }}>
            <h5 style={{ fontWeight: '600', margin: '0.5rem', textDecoration: 'underline' }}>Beskrivelse</h5>
            <p style={{ margin: '1rem' }}>{description}</p>

            <h5 style={{ fontWeight: '600', margin: '0.5rem', textDecoration: 'underline' }}>Regler</h5>
            <p style={{ margin: '1rem' }}>{rules}</p>

            <h6 style={{ fontWeight: '600', margin: '0.5rem', textDecoration: 'underline' }}>Kategori</h6>
            <p
              style={{
                margin: '1rem',
                border: '1px solid black',
                borderRadius: '0.25rem',
                width: 'fit-content',
                padding: '0.25rem 0.5rem 0.25rem 0.5rem',
              }}
            >
              {activity_type}
            </p>
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
          <div>
            {reviews &&
              reviews.length > 0 &&
              reviews
                .filter((review) => review.activity === id)
                .reverse()
                .map((review: ReviewDto) => (
                  <ReviewComp
                    key={review.id}
                    owner_id={review.owner}
                    rating={review.rating}
                    review_description={review.details}
                    owner_name={review.owner_username}
                    review_id={review.id}
                    owner_gradient={review.owner_gradient}
                  />
                ))}
          </div>
        </Modal.Body>
      </Modal>

      <ReviewForm
        activity_id={id}
        showReviewForm={showReviewForm}
        activity_title={title}
        onClose={() => setShowReviewForm(false)}
      />
      <CustomToast
        position={'top-left'}
        toastTitle={toastTitle}
        toastMessage={toastMsg}
        variant={submitStatus}
        setToastState={setShowToast}
        toastState={showToast}
      />

      <Modal onHide={closeActivityReportModal} show={showActivityReportModal} close>
        <Modal.Header closeButton>
          <Modal.Title style={{ padding: '2rem' }}>Er du sikker på at du vil rapportere?</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ padding: '2rem' }}>
          <Button variant={'warning'} onClick={() => handleReportActivity(id)}>
            Ja
          </Button>
        </Modal.Body>
      </Modal>

      <Modal onHide={closeActivityDeleteModal} show={showActivityDeleteModal} close>
        <Modal.Header closeButton>
          <Modal.Title style={{ padding: '2rem' }}>Er du sikker på at du vil slette?</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ padding: '2rem' }}>
          <Button variant={'danger'} onClick={() => handleDeleteActivity(id)}>
            Ja
          </Button>
        </Modal.Body>
      </Modal>
    </>
  );
}
