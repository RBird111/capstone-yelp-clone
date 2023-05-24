import { NavLink } from "react-router-dom/cjs/react-router-dom.min";
import "./CategoryCard.scss";

const CategoryCard = ({ category }) => {
  const iconClass = {
    restaurant: "fa-utensils",
    shopping: "fa-cart-shopping",
    automotive: "fa-car",
    "home services": "fa-house",
  };

  return (
    <NavLink to={`/category/${category}`}>
      <div className="category-card">
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
