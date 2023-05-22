import Error from "../Error";
import "./FormInput.scss";

export const toInput = (
  label,
  value,
  onChange,
  isSubmitted,
  error,
  type = "text"
) => ({
  label,
  value,
  onChange,
  isSubmitted,
  error,
  type,
});

const FormInput = ({ input }) => {
  const { label, value, onChange, isSubmitted, error, type } = input;

  return (
    <div className="form-input">
      {isSubmitted && error && <Error error={error} />}

      <input
        type={type}
        name={label}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={label}
      />
    </div>
  );
};

export default FormInput;
