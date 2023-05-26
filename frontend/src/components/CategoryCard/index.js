import { NavLink } from "react-router-dom/cjs/react-router-dom.min";
import { useSelector } from "react-redux";
import "./CategoryCard.scss";

const CategoryCard = ({ category }) => {
  const iconClass = {
    restaurant: "fa-utensils",
    shopping: "fa-cart-shopping",
    automotive: "fa-car",
    "home services": "fa-house",
  };

  const allReviews = useSelector((state) => state.reviews.allReviews);
  const reviews = Object.values(allReviews);

  const images = reviews.reduce((acc, review) => {
    const imgArr = Object.values(review.images);
    acc.push(...imgArr);
    return acc;
  }, []);

  return (
    <NavLink to={`/category/${category}`}>
      <div
        className="category-card"
        style={{
          backgroundImage: `url(${
            images[Math.floor(Math.random() * images.length)].url_regular
          })`,
        }}
      >
        <i className={`fa-solid ${iconClass[category]} fa-lg`} />

        <p className="category-name">
          {category
            .split(" ")
            .map((word) => word[0].toUpperCase() + word.slice(1))
            .join(" ")}
        </p>
      </div>
    </NavLink>
  );
};

export default CategoryCard;
