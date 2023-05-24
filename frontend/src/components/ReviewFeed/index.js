import ProfileIcon from "../FormElements/ProfileIcon";
import StarRatingBar from "../FormElements/StarRatingBar";
import "./ReviewFeedItem.scss";

const ReviewFeedItem = ({ review }) => {
  const { user, rating, body } = review;

  return (
    <div className="review-feed-item">
      <div className="name-tag">
        <ProfileIcon />

        <p>
          {user.first_name} {user.last_name[0]}.
        </p>
      </div>

      <StarRatingBar rating={rating} />

      <p className="body">{body}</p>
    </div>
  );
};

export default ReviewFeedItem;
