import '../styles/Review.css';
import { ReactNode, useEffect, useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { deleteReview, getReportedReviewByReviewId, postReportReview } from '~/api';
import { useAuthContext } from '~/contextProviders/AuthContextProvider';
import { Icon } from '@iconify/react';
import { ReportedReviewDto } from '~/dto';

export type ReviewProps = {
  review_id?: number;
  rating: number;
  review_description: string;
  owner_name: string;
  children?: ReactNode;
};

export default function ReviewComp({ review_id, rating, review_description, owner_name, children }: ReviewProps) {
  const { user } = useAuthContext();
  const [showReportModal, setShowReportModal] = useState<boolean>();
  const [isReported, setIsReported] = useState(false);
  const [reportCount, setReportCount] = useState(0);
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>();
  const [isVisible, setIsVisible] = useState<boolean>(true);

  useEffect(() => {
    if (review_id) {
      getReportedReviewByReviewId(review_id)
        .then((response: ReportedReviewDto[]) => {
          setReportCount(response.length);
          setIsReported(response.length > 0);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [review_id]);

  const handleReport = () => {
    if (review_id) {
      postReportReview(review_id)
        .then(() => {
          setIsReported(true); // Update reported status
          setReportCount((prevCount) => prevCount + 1); // Increment report count
          setShowReportModal(false); // Close the modal
        })
        .catch((error) => {
          console.error('Error reporting the review: ', review_id, error);
        });
    }
  };

  const handleDelete = () => {
    deleteReview(review_id)
      .then((resposne) => {
        console.log(resposne);
        closeDeleteModal();
        setIsVisible(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const closeReportModal = () => setShowReportModal(false);
  const openReportModal = () => setShowReportModal(true);

  const openDeleteModal = () => setShowDeleteModal(true);
  const closeDeleteModal = () => setShowDeleteModal(false);
  return isVisible ? (
    <>
      <div className="container">
        <div className="ratingSubcontainer1">
          <div className="header">
            <h5>
              <b>Bruker: </b>
              {owner_name}
            </h5>
          </div>
          <div className="descriptionContainer">
            <p>
              <b>Vurdering:</b>
            </p>
            <p className="reviewText">{review_description}</p>
          </div>
        </div>
        <div className="ratingSubcontainer2">
          <div className="ratingContainer">
            <p>Rating: {rating}</p>
          </div>

          <div className="iconContainer">
            {isReported && <Icon icon="ic:baseline-flag" width="16" height="16" color={'red'} />}
            {reportCount > 0 ? <span>{reportCount}</span> : null}
          </div>
          <div className="rapporterBtnContainer">
            <div>
              {user && user.username !== owner_name && (
                <>
                  <Button onClick={openReportModal} size="sm" variant="warning">
                    Rapporter
                  </Button>
                </>
              )}
              {user && user.username === owner_name && (
                <>
                  <Button onClick={openDeleteModal} size="sm" variant="danger">
                    Slett
                  </Button>
                </>
              )}
            </div>
          </div>
          {children}
        </div>
      </div>

      <Modal onHide={closeReportModal} show={showReportModal} close>
        <Modal.Header closeButton>
          <Modal.Title style={{ padding: '2rem' }}>Er du sikker på at du vil rapportere?</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ padding: '2rem' }}>
          <Button variant={'warning'} onClick={handleReport}>
            Ja
          </Button>
        </Modal.Body>
      </Modal>
      <Modal onHide={closeDeleteModal} show={showDeleteModal} close>
        <Modal.Header closeButton>
          <Modal.Title style={{ padding: '2rem' }}>Er du sikker på at du vil slette?</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ padding: '2rem' }}>
          <Button variant={'danger'} onClick={handleDelete}>
            Ja
          </Button>
        </Modal.Body>
      </Modal>
    </>
  ) : null;
}
