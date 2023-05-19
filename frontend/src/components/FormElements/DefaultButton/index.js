import "./DefaultButton.scss";

const DefaultButton = ({ text, onClick }) => {
  return (
    <button className="default-btn" type="submit" onClick={onClick}>
      {text}
    </button>
  );
};

export default DefaultButton;
