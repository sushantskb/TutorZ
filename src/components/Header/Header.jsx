import "./header.css"
const Header = () => {
  return (
    <nav>
      <div className="container nav_container">
        <a href="index.html"><h4>TutorZ</h4></a>
        <ul className="nav_menu">
          <li><a href="index.html">Home</a></li>
          <li><a href="about.html">About</a></li>
          <li><a href="courses.html">Courses</a></li>
          <li><a href="contact.html">Contact</a></li>
        </ul>
        <button id="open-menu-btn"><i className="uil uil-bars"></i></button>
        <button id="close-menu-btn"><i className="uil uil-multiply"></i></button>
      </div>
    </nav>
  )
}

export default Header