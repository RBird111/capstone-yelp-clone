import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import "./Navigation.scss";

function Navigation({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);

  return (
    <div className="nav-bar-div">
      {/* <p className="nav-logo">whelp...</p> */}

      <NavLink className="nav-logo" exact to="/">
        whelp...
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
