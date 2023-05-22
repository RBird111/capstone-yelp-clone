import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";

import "./BusinessPage.scss";
import { getBusiness } from "../../store/business";
import StarRatingBar from "../FormElements/StarRatingBar";
import LoadingIcon from "../FormElements/LoadingIcon";
import ReviewCard from "../ReviewCard";

const BusinessPage = () => {
  const dispatch = useDispatch();

  const { businessId } = useParams();
  const business = useSelector((state) => state.business.currBusiness);
  const { name, description, category, location, reviews } = business;

  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(getBusiness(businessId)).then(() => setIsLoaded(true));
  }, [businessId, dispatch]);

  // Object to hold random reviews for Featured Reviews section
  const randReviews = {};

  // Function to pull a random review out of reviews
  const randReview = (reviews) =>
    Object.values(reviews)[
      Math.floor(Math.random() * Object.values(reviews).length)
    ];

  if (isLoaded) {
    // Number of random reviews to pull
    // (minimum of 3 or the total number of reviews)
    const numReviews = Math.min(4, Object.values(reviews).length);

    while (Object.values(randReviews).length < numReviews) {
      const review = randReview(reviews);

      randReviews[review.id] = review;
    }
  }

  if (!isLoaded) return <LoadingIcon />;

  return (
    <div className="business-page">
      <div className="top-bar">
        <h1 className="title">{name}</h1>

        <div className="avg-rating-top">
          <StarRatingBar rating={Number(business.avg_rating).toFixed(0)} />

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

        <button className="add-review">
          <i className="fa-regular fa-star" />
          Write a review
        </button>
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
              Object.values(randReviews).map((review) => (
                <ReviewCard key={review.id} review={review} />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusinessPage;
