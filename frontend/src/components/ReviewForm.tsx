import { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { postReview } from '~/api';
import { ReviewDto } from '~/dto';

type ReviewFormProps = {
  activity_title: string;
  activity_id: number;
};



export default function ReviewForm({ activity_title, activity_id }: ReviewFormProps) {
  const [activity_review_description, setReview] = useState('');
  const [review_rating, setRating] = useState(0);
  const submitActivity = (event: { preventDefault: () => void }) => {
    event.preventDefault();

    const data: ReviewDto = {
      details: activity_review_description,
      rating: review_rating,
      activity: activity_id
    };
    postReview(data)
  }
  return (
    <>
      <Modal.Header closeButton>
        <Modal.Title>
          <h2>Vurdering av: {activity_title}</h2>
        </Modal.Title>
      </Modal.Header>
      <Form.Control as="textarea" 
        rows={3} 
        value={activity_review_description}
        onChange={(event) => {setReview(event.target.value);}}
/>
      <p>Rating: antall stjerner</p>
      <Form>
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
            />
          ))}
        </div>
      </Form>
      <Button variant="primary" onClick={submitActivity}>
        Send inn
      </Button>
    </>
  );
}
