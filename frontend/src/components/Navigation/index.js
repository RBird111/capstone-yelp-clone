import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

import "./Navigation.scss";
import LoginFormPage from "../LoginFormPage";
import Logo from "../FormElements/Logo";
import OpenModalButton from "../OpenModalButton";
import ProfileButton from "./ProfileButton";
import SignupFormPage from "../SignupFormPage";

function Navigation({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);

  return (
    <div className="nav-bar-div">
      <NavLink className="nav-logo" exact to="/">
        {/* whelp... */}
        <Logo />
      </NavLink>

      {isLoaded && sessionUser ? (
        <div>
          <ProfileButton user={sessionUser} />
        </div>
      ) : (
        <div className="logged-out">
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
