import '../styles/Review.css';

export type ReviewProps = {
  rating: number;
  review_description: string;
  owner_name: string;
};



export default function ReviewComp({ rating, review_description, owner_name}: ReviewProps) {
  return (
    <div className="container">
      <div className="header">
        <h3>{owner_name}</h3>
      </div>
      <div className="ratingContainer">
        <p>Rating: {rating}</p>
      </div>
      <p className="reviewText">{review_description}</p>
    </div>
  );
}
