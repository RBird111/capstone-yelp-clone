import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getAllReviews } from "../../store/reviews";

import "./LandingPage.scss";
import ReviewCard from "../ReviewCard";
import CategoryCard from "../CategoryCard";
import LoadingIcon from "../FormElements/LoadingIcon";

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

  if (!isLoaded) return <LoadingIcon />;

  return (
    <div className="landing-page">
      {/* Recent Activity */}
      <h1 className="title">Recent Activity</h1>
      <div className="reviews">
        {Object.values(randReviews).map((review) => (
          <ReviewCard key={review.id} review={review} />
        ))}
      </div>

      {/* Categories */}
      <h1 className="title">Categories</h1>
      <div className="categories">
        {["home services", "shopping", "restaurant", "automotive"].map(
          (service, idx) => (
            <CategoryCard key={idx} category={service} />
          )
        )}
      </div>
    </div>
  );
};

export default LandingPage;
