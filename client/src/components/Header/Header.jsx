import { useState, useContext, useEffect } from "react";
import "./header.css";
import { Link } from "react-router-dom";
import { AuthContext } from "../../components/Context/AuthContext";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [menu, setMenu] = useState(false);
  const { user } = useContext(AuthContext);

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
            <Link
              to={
                user.role === "student"
                  ? `/student-profile/${user._id}`
                  : `/tutor-profile/${user._id}`
              }
              onClick={closeToggle}
            >
              <img
                src={
                  user.profileImage
                    ? user.profileImage
                    : `https://api.dicebear.com/9.x/initials/svg?seed=${user.name}&backgroundColor=00897b,00acc1,039be5,1e88e5,3949ab,43a047,5e35b1,7cb342,8e24aa,c0ca33,d81b60,e53935,f4511e,fb8c00,fdd835,ffb300,c0aede`
                }
                alt="Profile"
                className="profile-icon"
              />
            </Link>
          ) : (
            <Link to="/login" onClick={closeToggle}>
              <button
                className="btn btn-primary login"
                style={{ margin: "auto" }}
              >
                Login
              </button>
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
