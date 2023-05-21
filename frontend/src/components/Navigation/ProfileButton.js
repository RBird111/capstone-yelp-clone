import { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";

import { logout } from "../../store/session";
import OpenModalButton from "../OpenModalButton";
import LoginFormPage from "../LoginFormPage";
import SignupFormPage from "../SignupFormPage";
import ProfileIcon from "../FormElements/ProfileIcon";

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (!ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logout());
  };

  const divClassName = "profile-dropdown" + (showMenu ? "" : " hidden");
  const closeMenu = () => setShowMenu(false);

  return (
    <div className="profile-button-div">
      <ProfileIcon props={{ onClick: openMenu }} />

      <div className={divClassName} ref={ulRef}>
        {user ? (
          <>
            <p>{user.username}</p>

            <p>{user.email}</p>

            <button onClick={handleLogout}>Log Out</button>
          </>
        ) : (
          <>
            <div onClick={(e) => setShowMenu(false)}>
              <OpenModalButton
                buttonText="Log In"
                onItemClick={closeMenu}
                modalComponent={<LoginFormPage />}
              />
            </div>

            <div onClick={(e) => setShowMenu(false)}>
              <OpenModalButton
                buttonText="Sign Up"
                onItemClick={closeMenu}
                modalComponent={<SignupFormPage />}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default ProfileButton;
