/* eslint-disable react/prop-types */

const AboutCard = ({name, socials, role, image}) => {
  return (
    <article className="team_member">
      <div className="team_member-image">
        <img
          src={image}
          alt=""
        />
      </div>
      <div className="team_member-info">
        <h4>{name}</h4>
        <p>{role}</p>
      </div>
      <div className="team_member-socials">
        <a href={socials.instagram}>
          <i className="uil uil-instagram"></i>
        </a>
        <a href={socials.facebook}>
          <i className="uil uil-facebook"></i>
        </a>
        <a href={socials.twitter}>
          <i className="uil uil-linkedin"></i>
        </a>
      </div>
    </article>
  );
};

export default AboutCard;
