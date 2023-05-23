import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";

import "./ReviewForm.scss";
import { useModal } from "../../context/Modal";
import { createReview } from "../../store/reviews";
import DefaultButton from "../FormElements/DefaultButton";
import StarRatingBar from "../FormElements/StarRatingBar";
import Error from "../FormElements/Error";
import { getBusiness } from "../../store/business";

const alreadyReviewed = (user) => {};

const ReviewForm = ({ business }) => {
  const dispatch = useDispatch();

  const { closeModal } = useModal();

  const [rating, setRating] = useState(null);
  const [body, setBody] = useState("");
  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Validations
  useEffect(() => {
    setErrors({});
    const errorsObj = {};

    if (!rating) errorsObj.rating = "Must give a rating";

    if (!body) errorsObj.body = "Must fill out review";
    else if (body.length > 1000)
      errorsObj.body = "Review must be less than 1000 characters";

    setErrors(errorsObj);
  }, [body, rating]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsSubmitted(true);

    if (Object.values(errors).length === 0) {
      const review = {
        rating,
        body,
        business_id: business.id,
      };

      const data = await dispatch(createReview(review));

      if (data.errors) {
        const errorsObj = {};

        for (const error of data) {
          const [name, message] = error.split(" : ");
          errorsObj[name] = message;
        }

        return setErrors(errorsObj);
      }

      await dispatch(getBusiness(business.id));
      closeModal();
    }
  };

  return (
    <div className="review-form">
      <h1>{business.name}</h1>
      <p className="p-title">How would you rate your experience?</p>

      <form onSubmit={handleSubmit}>
        {isSubmitted && errors.rating && <Error error={errors.rating} />}
        <StarRatingBar rating={rating} setRating={setRating} />

        {isSubmitted && errors.body && <Error error={errors.body} />}
        <textarea
          placeholder="Write your review..."
          value={body}
          onChange={(e) => setBody(e.target.value)}
        />

        <DefaultButton text={"Submit Review"} />
      </form>
    </div>
  );
};

export default ReviewForm;
