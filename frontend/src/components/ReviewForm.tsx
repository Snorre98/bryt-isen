import { title } from 'process';
import { Modal, Button, Form } from 'react-bootstrap';

type ReviewFormProps = {
  activity_title: string;
};

export default function ReviewForm() {
  return (
    <div>
      <h2>Review</h2>
      <Form.Control as="textarea" rows={3} />
      <p>Rating: stars</p>
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
            />
          ))}
        </div>
      </Form>
      <Button variant="primary">Primary </Button>
      {'Send inn'}
    </div>
  );
}
