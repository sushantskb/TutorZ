import "./about.css";
import { aboutUs } from "../../data/aboutUs";
import AboutCard from "../../components/AboutCard/AboutCard";

const About = () => {
  return (
    <section className="team">
      <h2>Meet Our Team</h2>
      <div className="container team_container">
        {aboutUs.map((about) => (
          <AboutCard
            key={about.id}
            name={about.name}
            role={about.role}
            image={about.image}
            socials={about.socials}
          />
        ))}
      </div>
    </section>
  );
};

export default About;
