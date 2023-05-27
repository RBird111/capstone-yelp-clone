import { useModal } from "../../context/Modal";
import ProfileIcon from "../FormElements/ProfileIcon";
import StarRatingBar from "../FormElements/StarRatingBar";
import ReviewForm from "../ReviewForm";
import "./ReviewFeedItem.scss";

const ReviewFeedItem = ({ review, userEmail, business }) => {
  const { user, rating, body } = review;
  const { setModalContent } = useModal();

  const userOwned = userEmail === user.email;

  const style = () => {
    if (!userOwned) return {};
    return {
      outline: "2px solid #00ac82",
    };
  };

  return (
    <div className="review-feed-item" style={{ ...style() }}>
      <div className="name-tag">
        <ProfileIcon />

        {userOwned ? (
          <p>You</p>
        ) : (
          <p>
            {user.first_name} {user.last_name[0]}.
          </p>
        )}

        {userOwned && (
          <div
            className="edit-icon"
            title="Click to edit your review"
            onClick={() =>
              setModalContent(
                <ReviewForm business={business} review={review} />
              )
            }
          >
            <i className="fa-solid fa-pen-to-square fa-lg" />
          </div>
        )}
      </div>

      <StarRatingBar rating={rating} />

      <p className="body">{body}</p>
    </div>
  );
};

export default ReviewFeedItem;
