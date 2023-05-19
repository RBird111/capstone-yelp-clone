import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getAllReviews } from "../../store/reviews";

import "./LandingPage.scss";

const LandingPage = () => {
  const dispatch = useDispatch();

  const reviews = useSelector((state) => state.reviews.allReviews);

  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(getAllReviews()).then(() => setIsLoaded(true));
  }, [dispatch]);

  if (!isLoaded) return <>Loading...</>;

  return <div className="landing-page">{Object.values(reviews).length}</div>;
};

export default LandingPage;
