import "./home.css";
import heroImage from "../../assets/hero-bg.jpg";
import { courseData } from "../../data/courses";
import CoursesCard from "../../components/CoursesCard/CoursesCard";
import { faqs } from "../../data/faqs";
import FaqsCard from "../../components/FaqsCard/FaqsCard";
import Testimonial from "../../components/Testimonial/Testimonial";
import "swiper/css"
const Home = () => {
  
  return (
    <div>
      {/* ====Hero Section==== */}
      <header style={{ marginTop: "-100px" }}>
        <div className="container header_container">
          <div className="header_left">
            <h1>Unlock Your Potential with Personalized Tutoring</h1>
            <p>
              Welcome to TutorZ, where learning knows no bounds. Our platform
              connects you with expert tutors who are dedicated to helping you
              succeed.
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

      {/* =====Categorties Section====== */}
      <section className="categories">
        <div className="container categories_container">
          <div className="categories_left">
            <h1>Categories</h1>
            <p>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Veniam
              earum aspernatur et asperiores maiores quibusdam?
            </p>
            <a href="#" className="btn" style={{ color: "black" }}>
              Learn More
            </a>
          </div>

          <div className="categories_right">
            <article className="category">
              <span className="category_icon">
                <span className="category_icon">
                  <i className="uil uil-bitcoin-circle"></i>
                </span>
                <h5>Blockchain</h5>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
              </span>
            </article>

            <article className="category">
              <span className="category_icon">
                <span className="category_icon">
                  <i className="uil uil-palette"></i>
                </span>
                <h5>Graphics Design</h5>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
              </span>
            </article>

            <article className="category">
              <span className="category_icon">
                <span className="category_icon">
                  <i className="uil uil-usd-circle"></i>
                </span>
                <h5>Finance</h5>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
              </span>
            </article>

            <article className="category">
              <span className="category_icon">
                <span className="category_icon">
                  <i className="uil uil-megaphone"></i>
                </span>
                <h5>Marketing</h5>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
              </span>
            </article>

            <article className="category">
              <span className="category_icon">
                <span className="category_icon">
                  <i className="uil uil-music"></i>
                </span>
                <h5>Music</h5>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
              </span>
            </article>

            <article className="category">
              <span className="category_icon">
                <span className="category_icon">
                  <i className="uil uil-puzzle-piece"></i>
                </span>
                <h5>Business</h5>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
              </span>
            </article>
          </div>
        </div>
      </section>
      {/* =====Categorties Section End====== */}

      {/* ======Courses Section===== */}
      <section className="courses">
        <h2>Courses we offer</h2>
        <div className="container courses_container">
          {courseData.slice(0, 3).map((course) => (
            <CoursesCard
              key={course.id}
              title={course.title}
              image={course.image}
              description={course.description}
            />
          ))}
        </div>
      </section>
      {/* ======Courses End===== */}

      {/* =====FAQS Section===== */}
      <section className="faqs">
        <h2>Frequenty Asked Questions</h2>
        <div className="container faqs_container">
          {faqs.map((faq) => (
            <FaqsCard key={faq.id} question={faq.question} answer={faq.answer} />
          ))}
        </div>
      </section>
      {/* =====FAQS Section End===== */}


      {/* =====Testimonils==== */}
      <section className="container testimonial_container mySwiper">
        <h2>Student&apos;s Testimonial</h2>
        <Testimonial />
        <div className="swiper-pagination"></div>
    </section>
      {/* =====Testimonils End==== */}
    </div>
  );
};

export default Home;
