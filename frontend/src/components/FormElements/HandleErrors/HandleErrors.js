import "./HandleErrors.scss";

const HandleErrors = ({ errors }) => {
  return (
    <div className="error-handler">
      {Object.values(errors).map((error, idx) => (
        <p key={idx}>{error.replace(/\w+ : /, "")}</p>
      ))}
    </div>
  );
};

export default HandleErrors;
