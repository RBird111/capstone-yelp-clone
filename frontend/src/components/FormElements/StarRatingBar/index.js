import { useState } from "react";

const StarRatingBar = ({ rating, setRating }) => {
  const colors = {
    1: "#ffcc4b",
    2: "#ffad48",
    3: "#ff8742",
    4: "#ff643d",
    5: "#fb433c",
  };

  const [disRating, setDisRating] = useState(rating);

  const createProps = () => {
    return {
      onMouseEnter: () => {},
      onMouseLeave: () => {},
      onClick: () => {},
    };
  };

  const StarIcon = ({ number }) => {
    const iconColor = number <= rating ? colors[rating] : "lightgray";

    const starStyling = {
      border: `1px solid ${iconColor}`,
      backgroundColor: `${iconColor}`,
      margin: `1px`,
      borderRadius: `5px`,
    };

    return (
      <div style={starStyling}>
        <i
          style={{ padding: "5px", color: "white" }}
          className={`fa-solid fa-star`}
        />
      </div>
    );
  };

  return (
    <div style={{ display: "flex" }}>
      {[1, 2, 3, 4, 5].map((number) => (
        <StarIcon key={number} number={number} />
      ))}
    </div>
  );
};

export default StarRatingBar;
