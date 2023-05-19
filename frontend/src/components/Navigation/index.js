import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import "./Navigation.scss";
import Logo from "../FormElements/Logo";

function Navigation({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);

  return (
    <div className="nav-bar-div">
      <NavLink className="nav-logo" exact to="/">
        {/* whelp... */}
        <Logo />
      </NavLink>

      {isLoaded && (
        <>
          <ProfileButton user={sessionUser} />
        </>
      )}
    </div>
  );
}

export default Navigation;
