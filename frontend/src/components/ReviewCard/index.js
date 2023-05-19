import "./ReviewCard.scss";
import StarRatingBar from "../FormElements/StarRatingBar";

const ReviewCard = ({ review }) => {
  return (
    <div className="review-card">
      <div key={review.id}>
        <p>{review.user.username}</p>
        <StarRatingBar rating={review.rating} />
      </div>
    </div>
  );
};

export default ReviewCard;
