import { useState } from "react"
import "./header.css"
import { useEffect } from "react";
import { Link } from "react-router-dom";
const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    }

    window.addEventListener("scroll", handleScroll)

    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])
  return (
    <nav className={isScrolled ? "window-scroll" : ""}>
      <div className="container nav_container">
        <a href="index.html"><h4>TutorZ</h4></a>
        <ul className="nav_menu">
          <li><Link to="/home">Home</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/courses">Courses</Link></li>
          <li><Link to="/tutors">Tutors</Link></li>
          <li><Link to="/contact">Contact</Link></li>
        </ul>
        <button id="open-menu-btn"><i className="uil uil-bars"></i></button>
        <button id="close-menu-btn"><i className="uil uil-multiply"></i></button>
      </div>
    </nav>
  )
}

export default Header