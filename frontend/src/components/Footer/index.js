import "./Footer.scss";

const Footer = () => {
  return (
    <div className="footer">
      <div className="personal-info">
        <p className="name">Roosevelt Burden</p>

        <a target="_blank" rel="noreferrer" href="https://github.com/MrBird88">
          <i className="fa-brands fa-github fa-lg" />
        </a>

        <a target="_blank" rel="noreferrer" href="https://www.linkedin.com/">
          <i className="fa-brands fa-linkedin fa-lg" />
        </a>
      </div>

      <div className="repo-link">
        <a
          target="_blank"
          rel="noreferrer"
          href="https://github.com/MrBird88/capstone-yelp-clone"
        >
          GitHub Repo
        </a>
      </div>

      <div>
        <p>@2023</p>
      </div>
    </div>
  );
};

export default Footer;
