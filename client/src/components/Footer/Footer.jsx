import "./footer.css"
const Footer = () => {
  return (
    <footer className="footer">
      <div className="container footer_container">
        <div className="footer_1">
          <a href="index.html" className="footer_logo"><h4>TutorZ</h4></a>
          <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Similique ab assumenda numquam.</p>
        </div>

        <div className="footer_2">
          <h4>Permalinks</h4>
          <ul className="permalinks">
            <li><a href="index.html">Home</a></li>
            <li><a href="about.html">About</a></li>
            <li><a href="courses.html">Courses</a></li>
            <li><a href="contact.html">Contact</a></li>
          </ul>
        </div>


        <div className="footer_3">
          <h4>Privacy</h4>
          <ul className="privacy">
            <li><a href="#">Privacy Policy</a></li>
            <li><a href="#">Terms and Conditions</a></li>
            <li><a href="#">Refund Policy</a></li>
          </ul>
        </div>


        <div className="footer_4">
          <h4>Contact Us</h4>
          <div>
            <p>+12 345 6900</p>
            <p>whoami@gmail.com</p>
          </div>

          <ul className="footer_socials">
            <li>
              <a href="#"><i className="uil uil-facebook-f"></i></a>
            </li>
            <li>
              <a href="#"><i className="uil uil-instagram-alt"></i></a>
            </li>
            <li>
              <a href="#"><i className="uil uil-twitter"></i></a>
            </li>
            <li>
              <a href="#"><i className="uil uil-linkedin-alt"></i></a>
            </li>
          </ul>
        </div>
      </div>
      <div className="footer_copyright">
        <small>Copyright &copy; TutorZ</small>
      </div>
    </footer>
  )
}

export default Footer