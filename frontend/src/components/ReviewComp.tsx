import { Col } from 'react-bootstrap';
import '../styles/Review.css';

export type ReviewProps = {
  username: string;
  rating: number;
  review_description: string;
  img: string;
};

// Endre funksjonen til å returnere JSX istedenfor void
export default function ReviewComp({ username, rating, review_description, img }: ReviewProps) {
  // Returner et JSX-element som viser informasjonen
  return (
    <div className="container">
      <div className="header">
        <img src={img} alt="Profile" className="profileImage" />
        <h3>{username}</h3>
      </div>
      <div className="ratingContainer">
        <p>Rating: {rating}</p>
      </div>
      <p className="reviewText">{review_description}</p>
    </div>
  );
}
