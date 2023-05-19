import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getAllReviews } from "../../store/reviews";

import "./LandingPage.scss";
import ReviewCard from "../ReviewCard";
import StarRatingBar from "../FormElements/StarRatingBar";

const LandingPage = () => {
  const dispatch = useDispatch();

  let reviews = useSelector((state) => state.reviews.allReviews);
  reviews = Object.values(reviews);

  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(getAllReviews()).then(() => setIsLoaded(true));
  }, [dispatch]);

  // Pulls 6 random reviews
  const randReviews = {};
  if (reviews.length) {
    while (Object.values(randReviews).length < 6) {
      const review = reviews[Math.floor(Math.random() * reviews.length)];
      randReviews[review.id] = review;
    }
  }

  const [rating, setRating] = useState(0);

  if (!isLoaded) return <>Loading...</>;

  return (
    <div className="landing-page">
      <h2>Star Rating Reactivity Test</h2>
      <StarRatingBar rating={rating} setRating={setRating} />

      <h2>Recent Activity</h2>

      <div className="reviews">
        {Object.values(randReviews).map((review) => (
          <ReviewCard key={review.id} review={review} />
        ))}
      </div>
    </div>
  );
};

export default LandingPage;
