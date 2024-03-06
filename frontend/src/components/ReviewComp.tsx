import { Col } from 'react-bootstrap';
import '../styles/Review.css';

export type ReviewProps = {
  ownerID: number;
  rating: number;
  review_description: string;
};

// Endre funksjonen til å returnere JSX istedenfor void
export default function ReviewComp({ ownerID, rating, review_description}: ReviewProps) {
  // Returner et JSX-element som viser informasjonen
  return (
    <div className="container">
      <div className="header">
        <h3>{ownerID}</h3>
      </div>
      <div className="ratingContainer">
        <p>Rating: {rating}</p>
      </div>
      <p className="reviewText">{review_description}</p>
    </div>
  );
}
