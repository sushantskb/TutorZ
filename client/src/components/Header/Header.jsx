import { useState } from "react";
import "./header.css";
import { useEffect } from "react";
import { Link } from "react-router-dom";
const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [menu, setMenu] = useState(false);

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
        <a href="index.html">
          <h4>TutorZ</h4>
        </a>
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
