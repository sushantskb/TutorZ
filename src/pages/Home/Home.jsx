import "./home.css";
import heroImage from "../../assets/hero-bg.jpg";
const Home = () => {
  return (
    <div>
      {/* ====Hero Section==== */}
      <header style={{ marginTop: "-100px" }}>
        <div className="container header_container">
          <div className="header_left">
            <h1>Unlock Your Potential with Personalized Tutoring</h1>
            <p>
              Welcome to TutorZ, where learning knows no bounds. Our
              platform connects you with expert tutors who are dedicated to
              helping you succeed.
            </p>
            <a href="courses.html" className="btn btn-primary">
              Get Started
            </a>
          </div>

          <div className="header_right">
            <div className="header_right-image">
              <img src={heroImage} alt="Hero-Image" />
            </div>
          </div>
        </div>
      </header>
      {/* ====Hero Section End==== */}
    </div>
  );
};

export default Home;
