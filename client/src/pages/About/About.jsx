import "./about.css";
const About = () => {
  return (
    <section className="team">
      <h2>Meet Our Team</h2>
      <div className="contianer team_container">
        <article className="team_member">
          <div className="team_member-image">
            <img
              src="https://static.vecteezy.com/system/resources/thumbnails/029/711/176/small_2x/developer-with-ai-generated-free-png.png"
              alt=""
            />
          </div>
          <div className="team_member-info">
            <h4>XYZ</h4>
            <p>Exper</p>
          </div>
          <div className="team_member-socials">
            <a href="https://instagram.com">
              <i className="uil uil-instagram"></i>
            </a>
            <a href="https://facebook.com">
              <i className="uil uil-facebook"></i>
            </a>
            <a href="https://x.com">
              <i className="uil uil-twitter-alt"></i>
            </a>
          </div>
        </article>
        <article className="team_member">
          <div className="team_member-image">
            <img
              src="https://static.vecteezy.com/system/resources/thumbnails/029/711/176/small_2x/developer-with-ai-generated-free-png.png"
              alt=""
            />
          </div>
          <div className="team_member-info">
            <h4>XYZ</h4>
            <p>Exper</p>
          </div>
          <div className="team_member-socials">
            <a href="https://instagram.com">
              <i className="uil uil-instagram"></i>
            </a>
            <a href="https://facebook.com">
              <i className="uil uil-facebook"></i>
            </a>
            <a href="https://x.com">
              <i className="uil uil-twitter-alt"></i>
            </a>
          </div>
        </article>
      </div>
    </section>
  );
};

export default About;
