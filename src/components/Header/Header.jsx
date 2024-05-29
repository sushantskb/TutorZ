import "./header.css"
const Header = () => {
  return (
    <nav>
      <div className="container nav_container">
        <a href="index.html"><h4>TutorZ</h4></a>
        <ul className="nav_menu">
          <li><a href="/home">Home</a></li>
          <li><a href="/about">About</a></li>
          <li><a href="/courses">Courses</a></li>
          <li><a href="/contact">Contact</a></li>
        </ul>
        <button id="open-menu-btn"><i className="uil uil-bars"></i></button>
        <button id="close-menu-btn"><i className="uil uil-multiply"></i></button>
      </div>
    </nav>
  )
}

export default Header