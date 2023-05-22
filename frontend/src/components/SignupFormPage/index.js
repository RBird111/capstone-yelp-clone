import { useState } from "react";
import { useDispatch } from "react-redux";
import { signUp } from "../../store/session";
import { useModal } from "../../context/Modal";

import "./SignupForm.scss";
import FormInput, { toInput } from "../FormElements/FormInput";
import HandleErrors from "../FormElements/HandleErrors";
import DefaultButton from "../FormElements/DefaultButton";

function SignupFormPage() {
  const dispatch = useDispatch();
  const { closeModal } = useModal();

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      const user = {
        email,
        username,
        password,
        first_name,
        last_name,
      };

      const data = await dispatch(signUp(user));
      if (data) {
        setErrors(data);
        console.log("THESE ARE ERRORS =>", errors);
      } else {
        closeModal();
      }
    } else {
      setErrors([
        "Confirm Password field must be the same as the Password field",
      ]);
    }
  };

  return (
    <div className="signup-form">
      <h1>
        Sign Up for&nbsp;<span>W</span>help...
      </h1>

      <form onSubmit={handleSubmit}>
        <HandleErrors errors={errors} />

        <FormInput input={toInput("First Name", first_name, setFirstName)} />

        <FormInput input={toInput("Last Name", last_name, setLastName)} />

        <FormInput input={toInput("Email", email, setEmail)} />

        <FormInput input={toInput("Username", username, setUsername)} />

        <FormInput
          input={toInput("Password", password, setPassword, "password")}
        />

        <FormInput
          input={toInput(
            "Confirm Password",
            confirmPassword,
            setConfirmPassword,
            "password"
          )}
        />

        <DefaultButton text={"Sign Up"} />
      </form>
    </div>
  );
}

export default SignupFormPage;
