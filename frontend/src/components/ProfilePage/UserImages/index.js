import { useDispatch, useSelector } from "react-redux";
import "./UserImages.scss";
import { useEffect, useState } from "react";
import { getUserImages } from "../../../store/images";

const UserImages = ({ user }) => {
  const dispatch = useDispatch();
  let images = useSelector((state) => state.images.userImages);
  images = Object.values(images);
  const length = images.length;

  const [idx, setIdx] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(getUserImages()).then(() => setIsLoaded(true));
  }, [dispatch]);

  if (!isLoaded) return <>Loading...</>;

  return (
    <div className="user-images">
      <img
        src={images[idx].url}
        alt="carousel"
        onClick={() => setIdx((idx + 1) % length)}
      />
    </div>
  );
};

export default UserImages;
