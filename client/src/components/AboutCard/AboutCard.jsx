/* eslint-disable react/prop-types */

const AboutCard = ({ name, socials, role, image }) => {
  return (
    <article className="team_member">
      <div className="team_member-image">
        <img src={image} alt={name} />
      </div>
      <div className="team_member-info">
        <h4>{name}</h4>
        <p>{role}</p>
      </div>
      <div className="team_member-socials">
        {socials.instagram && (
          <a href={socials.instagram} target="_blank" rel="noopener noreferrer">
            <i className="uil uil-instagram"></i>
          </a>
        )}
        {socials.facebook && (
          <a href={socials.facebook} target="_blank" rel="noopener noreferrer">
            <i className="uil uil-facebook"></i>
          </a>
        )}
        {socials.linkedin && (
          <a href={socials.linkedin} target="_blank" rel="noopener noreferrer">
            <i className="uil uil-linkedin"></i>
          </a>
        )}
      </div>
    </article>
  );
};

export default AboutCard;
