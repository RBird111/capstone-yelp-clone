import { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { login } from "../../store/session";
import "./LoginForm.scss";
import FormInput, { toInput } from "../FormElements/FormInput/FormInput";
import HandleErrors from "../FormElements/HandleErrors/HandleErrors";

function LoginFormPage() {
  const dispatch = useDispatch();
  const { closeModal } = useModal();

  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await dispatch(login({ credential, password }));
    if (data) {
      setErrors(data);
    } else {
      closeModal();
    }
  };

  return (
    <div className="login-form">
      <h1>Log In</h1>
      <form onSubmit={handleSubmit}>
        <HandleErrors errors={errors} />

        <FormInput
          input={toInput("Username or Email", credential, setCredential)}
        />

        <FormInput
          input={toInput("Password", password, setPassword, "password")}
        />

        <button type="submit">Log In</button>
      </form>
    </div>
  );
}

export default LoginFormPage;
