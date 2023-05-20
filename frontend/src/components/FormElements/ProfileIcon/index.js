import "./ProfileIcon.scss";

const ProfileIcon = ({ height = "40px", width = "40px" }) => {
  return (
    <div style={{ height: height, width: width }} className="icon-div">
      <i class="fa-solid fa-user fa-lg" />
    </div>
  );
};

export default ProfileIcon;
