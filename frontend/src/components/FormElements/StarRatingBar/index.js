import { useState } from "react";

// Bar that displays a rating using five StarIcon components
// It becomes reactive when supplite with a setRating function
// otherwise it remains inert when hovered over
const StarRatingBar = ({ rating, setRating }) => {
  const colors = {
    1: "#ffcc4b",
    2: "#ffad48",
    3: "#ff8742",
    4: "#ff643d",
    5: "#fb433c",
  };

  const [disRating, setDisRating] = useState(rating);

  // Component that renders a single star
  const StarIcon = ({ number }) => {
    const iconColor = number <= disRating ? colors[disRating] : "lightgray";

    // If setRating is supplied than the component becomes reactive
    const createProps = () => {
      // Function that does nothing
      // Default used if no setRating is supplied
      const def = () => {};

      return {
        onMouseEnter: setRating ? () => setDisRating(number) : def,
        onMouseLeave: setRating ? () => setDisRating(rating) : def,
        onClick: setRating ? () => setRating(number) : def,
      };
    };

    const starStyling = {
      border: `1px solid ${iconColor}`,
      backgroundColor: `${iconColor}`,
      margin: `1px`,
      borderRadius: `5px`,
    };

    return (
      <div style={starStyling} {...createProps()}>
        <i
          style={{ padding: "5px", color: "white" }}
          className={`fa-solid fa-star`}
        />
      </div>
    );
  };

  // Renders five StarIcons
  return (
    <div className="rating-bar" style={{ display: "flex" }}>
      {[1, 2, 3, 4, 5].map((number) => (
        <StarIcon key={number} number={number} />
      ))}
    </div>
  );
};

export default StarRatingBar;
