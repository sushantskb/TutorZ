import { useState, useContext, useEffect } from "react";
import "./header.css";
import { Link } from "react-router-dom";
import { AuthContext } from "../../components/Context/AuthContext";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [menu, setMenu] = useState(false);
  const { user } = useContext(AuthContext);
  console.log(user);

  const toggleMenu = () => {
    setMenu(!menu);
  };

  const closeToggle = () => {
    setMenu(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <nav className={isScrolled ? "window-scroll" : ""}>
      <div className="container nav_container">
        <Link to="/">
          <h4>TutorZ</h4>
        </Link>
        <ul className={menu ? "nav_menu open" : "nav_menu"}>
          <li>
            <Link to="/home" onClick={closeToggle}>
              Home
            </Link>
          </li>
          <li>
            <Link to="/about" onClick={closeToggle}>
              About
            </Link>
          </li>
          <li>
            <Link to="/courses" onClick={closeToggle}>
              Courses
            </Link>
          </li>
          <li>
            <Link to="/tutors" onClick={closeToggle}>
              Tutors
            </Link>
          </li>
          <li>
            <Link to="/contact" onClick={closeToggle}>
              Contact
            </Link>
          </li>
        </ul>
        <div className="nav_auth">
          {user ? (
            <Link to={user.role === "student" ? `/student-profile/${user._id}`: `/tutor-profile/${user._id}`} onClick={closeToggle}>
              <img
                src={
                  user.gender === "male"
                    ? "https://avatar.iran.liara.run/public/26"
                    : "https://avatar.iran.liara.run/public/97"
                }
                alt="Profile"
                className="profile-icon"
              />
            </Link>
          ) : (
            <Link to="/login" onClick={closeToggle}>
              <button className="btn btn-primary">Login</button>
            </Link>
          )}
        </div>
        <button id="open-menu-btn" onClick={toggleMenu}>
          {!menu ? (
            <i className="uil uil-bars"></i>
          ) : (
            <i className="uil uil-multiply"></i>
          )}
        </button>
      </div>
    </nav>
  );
};

export default Header;
