import "./CategoryCard.scss";

const CategoryCard = ({ category }) => {
  const iconClass = {
    restaurant: "fa-utensils",
    shopping: "fa-cart-shopping",
    automotive: "fa-car",
    "home services": "fa-house",
  };

  return (
    <div
      className="category-card"
      onClick={() => alert("TODO: Redirect to Categories Page")}
    >
      <i className={`fa-solid ${iconClass[category]} fa-lg`} />

      <p className="category-name">
        {category
          .split(" ")
          .map((word) => word[0].toUpperCase() + word.slice(1))
          .join(" ")}
      </p>
    </div>
  );
};

export default CategoryCard;
