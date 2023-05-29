import {
  NavLink,
  Route,
  Switch,
  useHistory,
} from "react-router-dom/cjs/react-router-dom";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

import "./ProfilePage.scss";
import LoadingIcon from "../FormElements/LoadingIcon";
import UserInfo from "./UserInfo";

const ProfilePage = () => {
  const history = useHistory();

  const user = useSelector((state) => state.session.user);

  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (!user) history.push("/");
    else setIsLoaded(true);
  }, [history, user]);

  if (!isLoaded) return <LoadingIcon />;

  return (
    <div className="profile-page">
      <div className="side-bar">
        <NavLink exact to="/profile">
          Profile
        </NavLink>

        <NavLink to="/profile/reviews">Reviews</NavLink>

        <NavLink to="/profile/images">Images</NavLink>
      </div>

      <div className="c-wrapper">
        <Switch>
          <Route exact path="/profile">
            <UserInfo user={user} />
          </Route>

          <Route path="/profile/reviews">
            <LoadingIcon />
          </Route>

          <Route path="/profile/images">
            <LoadingIcon />
          </Route>
        </Switch>
      </div>
    </div>
  );
};

export default ProfilePage;
