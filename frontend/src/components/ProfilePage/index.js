import { useHistory } from "react-router-dom/cjs/react-router-dom";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

import "./ProfilePage.scss";
import LoadingIcon from "../FormElements/LoadingIcon";
import UserInfo from "./UserInfo";
import ReviewFeedItem from "../ReviewFeedItem";

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
      <div className="account">
        <h1>Account Information</h1>
        <UserInfo user={user} />
      </div>

      <div className="personal-reviews">
        <h1>My Reviews</h1>
        <div className="user-review-items">
          {Object.values(user.reviews).map((review) => (
            <ReviewFeedItem
              key={review.id}
              review={review}
              userEmail={user.email}
              aboutMe={true}
              business={review.business}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
