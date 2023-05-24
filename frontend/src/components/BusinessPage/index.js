import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
  useHistory,
  useParams,
} from "react-router-dom/cjs/react-router-dom.min";

import "./BusinessPage.scss";
import { useModal } from "../../context/Modal";
import { getBusiness } from "../../store/business";
import StarRatingBar from "../FormElements/StarRatingBar";
import LoadingIcon from "../FormElements/LoadingIcon";
import ReviewCard from "../ReviewCard";
import ReviewForm from "../ReviewForm";
import LoginFormPage from "../LoginFormPage";
import BusinessForm from "../BusinessForm";

// Expects reviews to be normalized
const alreadyReviewed = (user, reviews) => {
  reviews = Object.values(reviews);
  for (const review of reviews) {
    if (review.user.email === user.email) {
      return review;
    }
  }
  return false;
};

const BusinessPage = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const { user } = useSelector((state) => state.session);

  const { setModalContent } = useModal();

  const { businessId } = useParams();

  const business = useSelector((state) => state.business.currBusiness);
  const { name, description, category, location, reviews, avg_rating } =
    business;

  const [isLoaded, setIsLoaded] = useState(false);

  const hasReview = user && reviews ? alreadyReviewed(user, reviews) : null;

  useEffect(() => {
    dispatch(getBusiness(businessId)).then((res) => {
      if (res.errors) history.push("/");
      else setIsLoaded(true);
    });
  }, [businessId, dispatch, history]);

  if (!isLoaded) return <LoadingIcon />;

  return (
    <div className="business-page">
      <div className="top-bar">
        <div className="title">
          <h1>{name}</h1>
          <p
            onClick={() =>
              setModalContent(<BusinessForm business={business} />)
            }
          >
            Update Business
          </p>
        </div>

        <div className="avg-rating-top">
          <StarRatingBar rating={Math.round(Number(avg_rating))} />

          <p className="reviews">
            {Object.values(reviews).length} review
            {Object.values(reviews).length === 1 ? "" : "s"}
          </p>

          <div className="location">
            {location.address}

            <p>
              {location.city}, {location.state}
            </p>
          </div>
        </div>

        <p className="category">
          <i className="fa-solid fa-building" />
          {category[0].toUpperCase() + category.slice(1)}
        </p>

        {user && hasReview ? (
          <button
            className="add-review"
            onClick={() =>
              setModalContent(
                <ReviewForm business={business} review={hasReview} />
              )
            }
          >
            <i className="fa-regular fa-star" />
            Update your review!
          </button>
        ) : user ? (
          <button
            className="add-review"
            onClick={() => setModalContent(<ReviewForm business={business} />)}
          >
            <i className="fa-regular fa-star" />
            Write a review!
          </button>
        ) : (
          <button onClick={() => setModalContent(<LoginFormPage />)}>
            Log in to review!
          </button>
        )}
      </div>

      <div className="about">
        <div className="details">
          <p className="title">About this business:</p>
          <p>{description}</p>
        </div>
      </div>

      <div className="featured-reviews">
        <div className="r-wrap">
          <p className="title">Featured Reviews:</p>

          <div className="reviews">
            {isLoaded &&
              Object.values(reviews).map((review) => (
                <ReviewCard key={review.id} review={review} />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusinessPage;
