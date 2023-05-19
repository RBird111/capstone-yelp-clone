import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getAllReviews } from "../../store/reviews";

import "./LandingPage.scss";

const LandingPage = () => {
  const dispatch = useDispatch();

  let reviews = useSelector((state) => state.reviews.allReviews);
  reviews = Object.values(reviews);

  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(getAllReviews()).then(() => setIsLoaded(true));
  }, [dispatch]);

  const randReviews = {};
  if (reviews.length) {
    for (let i = 0; i < 5; i++) {
      const review = reviews[Math.floor(Math.random() * reviews.length)];
      randReviews[review.id] = review;
    }
  }

  if (!isLoaded) return <>Loading...</>;

  return (
    <div className="landing-page">
      <div className="reviews">
        <h1>Recent Activity</h1>

        {Object.values(randReviews).map((review) => (
          <p key={review.id}>{review.user.username}</p>
        ))}
      </div>
    </div>
  );
};

export default LandingPage;
