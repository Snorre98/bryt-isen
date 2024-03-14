import { useState } from 'react';
import { Button, Form, Modal, ModalBody } from 'react-bootstrap';
import { postReview } from '~/api';
import { ReviewDto } from '~/dto';

type ReviewFormProps = {
  activity_id: number;
  showReviewForm: boolean;
  activity_title: string;
  onClose: () => void;
};

export default function ReviewForm({ activity_id, showReviewForm, activity_title, onClose }: ReviewFormProps) {
  const [activity_review_description, setReview] = useState('');
  const [review_rating, setRating] = useState(0);
  const [validated, setValidated] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    setValidated(true);
    const data: ReviewDto = {
      details: activity_review_description,
      rating: review_rating,
      activity: activity_id,
    };
    postReview(data)
      .then((response) => {
        setReview('');
        setRating(0);
        setValidated(false); // Reset form validation state
        onClose();
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <>
      <Modal show={showReviewForm} onHide={onClose} style={{ marginTop: '6rem' }}>
        <Modal.Header closeButton style={{ backgroundColor: 'rgba(82, 161, 255, 0.5)' }}>
          <Modal.Title style={{ padding: '1rem' }}>
            {' '}
            <b>Vurdering av:</b> {activity_title}
          </Modal.Title>
        </Modal.Header>
        <ModalBody style={{ padding: '2rem', backgroundColor: 'rgba(82, 161, 255, 0.2)' }}>
          <Form validated={validated} onSubmit={handleSubmit}>
            <Form.Control
              type="invalid"
              as="textarea"
              maxLength={40}
              placeholder={'max 40 karaktere'}
              rows={6}
              style={{ resize: 'none' }}
              value={activity_review_description}
              onChange={(event) => {
                setReview(event.target.value);
              }}
              required
            />

            <p>Rating: antall stjerner</p>

            <div className="mb-3">
              {[1, 2, 3, 4, 5].map((value) => (
                <Form.Check
                  inline
                  label={value.toString()}
                  name="rating"
                  type="radio"
                  id={`inline-radio-${value}`}
                  key={value}
                  checked={review_rating === value}
                  onChange={() => setRating(value)}
                  required
                />
              ))}
            </div>
            <Button type="submit" variant="primary">
              Send inn
            </Button>
          </Form>
        </ModalBody>
      </Modal>
    </>
  );
}
