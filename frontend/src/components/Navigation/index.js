import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
// import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

import "./Navigation.scss";
import { useModal } from "../../context/Modal";
import { login } from "../../store/session";
import LoginFormPage from "../LoginFormPage";
import Logo from "../FormElements/Logo";
import OpenModalButton from "../OpenModalButton";
import ProfileButton from "./ProfileButton";
import SignupFormPage from "../SignupFormPage";
import BusinessForm from "../BusinessForm";

function Navigation({ isLoaded }) {
  const dispatch = useDispatch();
  // const history = useHistory();

  const { setModalContent } = useModal();

  const sessionUser = useSelector((state) => state.session.user);

  const loginDemo = async (e) => {
    e.preventDefault();
    await dispatch(login({ credential: "demo-lition", password: "password" }));
    // history.push("/");
  };

  return (
    <div className="nav-bar-div">
      <NavLink className="nav-logo" exact to="/">
        {/* whelp... */}
        <Logo />
      </NavLink>

      {isLoaded && sessionUser ? (
        <div className="profile-div">
          <p
            className="add-business"
            onClick={() => setModalContent(<BusinessForm />)}
          >
            Add a Business
          </p>
          <ProfileButton user={sessionUser} />
        </div>
      ) : (
        <div className="logged-out">
          <p onClick={loginDemo}>Log In as Demo User</p>

          <OpenModalButton
            buttonText={"Log In"}
            modalComponent={<LoginFormPage />}
            color={"white"}
          />

          <OpenModalButton
            buttonText={"Sign Up"}
            modalComponent={<SignupFormPage />}
          />
        </div>
      )}
    </div>
  );
}

export default Navigation;
