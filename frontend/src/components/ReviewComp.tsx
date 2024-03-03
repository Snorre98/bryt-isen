import { Col } from 'react-bootstrap';
import '../styles/ReviewForm.css';
import reviewUserImg from

export type ReviewProps = {
  username: string;
  rating: number;
  review_description: string;
};

// Endre funksjonen til å returnere JSX istedenfor void
export default function ReviewComp({ username, rating, review_description }: ReviewProps) {
  // Returner et JSX-element som viser informasjonen
  return (
    <div>
      <h3>{username}</h3>
      <img src="../assets/bryt-isen-logo-blue.png" alt="" />
      <p>Rating: {rating}</p>
      <p>{review_description}</p>
    </div>
  );
}
