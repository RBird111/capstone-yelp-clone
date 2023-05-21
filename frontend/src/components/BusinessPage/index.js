import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";

import "./BusinessPage.scss";
import { getBusiness } from "../../store/business";
import StarRatingBar from "../FormElements/StarRatingBar";
import LoadingIcon from "../FormElements/LoadingIcon";

const BusinessPage = () => {
  const dispatch = useDispatch();

  const { businessId } = useParams();
  const business = useSelector((state) => state.business.currBusiness);
  const { name, description, category, location, reviews, images } = business;

  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(getBusiness(businessId)).then(() => setIsLoaded(true));
  }, [businessId, dispatch]);

  if (!isLoaded) return <LoadingIcon />;

  return (
    <div className="business-page">
      <h1>Name: {name}</h1>
      <h2>Category: {category}</h2>

      <div className="location">
        <p>Address: {location.address}</p>
        <p>City: {location.city}</p>
        <p>State: {location.state}</p>
      </div>

      <p>Description: {description}</p>

      <h3>Reviews:</h3>
      {Object.values(reviews).map((review) => (
        <div key={review.id}>
          <StarRatingBar rating={review.rating} />

          <p>Body: {review.body}</p>
        </div>
      ))}

      <h3>Images:</h3>
      {Object.values(images).map((image) => (
        <img key={image.id} src={image.url} alt="business" />
      ))}
    </div>
  );
};

export default BusinessPage;
