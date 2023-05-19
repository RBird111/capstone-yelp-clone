import "./FormInput.scss";

export const toInput = (label, value, onChange, type = "text") => ({
  label,
  value,
  onChange,
  type,
});

const FormInput = ({ input }) => {
  const { label, value, onChange, type } = input;

  return (
    <div className="form-input">
      <label htmlFor={label}>{label}</label>
      <input
        type={type}
        name={label}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
};

export default FormInput;
