import { title } from "process";
import { Modal, Button, Form } from "react-bootstrap";



type ReviewFormProps = {
  activity_title: string;
};

export default function ReviewForm({ activity_title }: ReviewFormProps) {
  

  


  return (

    <><Modal.Header closeButton>
      <Modal.Title>
        <h2>Vurdering av: {activity_title}</h2>
      </Modal.Title>
    </Modal.Header><Form.Control as="textarea" rows={3} /><p>Rating: antall stjerner</p><Form>
        <div className="mb-3">
          {[1, 2, 3, 4, 5].map((value) => (
            <Form.Check
              inline
              label={value.toString()}
              name="rating"
              type="radio"
              id={`inline-radio-${value}`}
              key={value} />
          ))}
        </div>
      </Form><Button variant="primary">
        Send inn
      </Button></>
  );
}
