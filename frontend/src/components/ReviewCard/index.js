import "./ReviewCard.scss";
import StarRatingBar from "../FormElements/StarRatingBar";
import { NavLink } from "react-router-dom/cjs/react-router-dom.min";

const ReviewCard = ({ review }) => {
  return (
    <div className="review-card">
      <div className="user-info">
        <p>
          {review.user.first_name} {review.user.last_name[0]}. wrote...
        </p>
      </div>

      <NavLink to={`/business/${review.business.id}`}>
        {review.business.name}
      </NavLink>

      <div className="star-rating-bar">
        <StarRatingBar rating={review.rating} />
      </div>

      <div className="review-body">
        <p>{review.body}</p>
      </div>

      <div className="icon-bar">
        {[
          "fa-regular fa-lightbulb fa-xl",
          "fa-regular fa-face-laugh fa-xl",
          "fa-regular fa-face-sad-cry fa-xl",
        ].map((className, idx) => (
          <div key={idx}>
            <i
              onClick={() => alert("Feature not yet implemented")}
              className={className}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReviewCard;
