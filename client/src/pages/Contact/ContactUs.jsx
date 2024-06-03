import "./contactUs.css"
const ContactUs = () => {
  return (
    <div className="contact">
      <div className="container contact_container">
        <aside className="contact_aside">
          <div className="aside_image">
            <img
              src="https://img.freepik.com/free-vector/contact-center-abstract-concept_335657-3032.jpg"
              alt=""
            />
          </div>
          <h2>Contact Us</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sed minus
            optio facere, qui quidem animi vitae beatae quae explicabo expedita
          </p>
          <ul className="contact_details">
            <li>
              <i className="uil uil-phone-times"></i>
              <h5>+223213413</h5>
            </li>
            <li>
              <i className="uil uil-envelope"></i>
              <h5>Accra, Ghana</h5>
            </li>
            <li>
              <i className="uil uil-location-point"></i>
            </li>
          </ul>
          <ul className="contact_socials">
            <li>
              <a href=""><i className="uil uil-facebook-f"></i></a>
            </li>
            <li>
              <a href=""><i className="uil uil-instagram"></i> </a>
            </li>
            <li>
              <a href=""><i className="uil uil-twitter"></i> </a>
            </li>
          </ul>
        </aside>

        <form className="contact_form">
          <div className="form_name">
            <input
              type="text"
              name="First Name"
              placeholder="First Name"
              required
            />
            <input
              type="text"
              name="Last Name"
              placeholder="Last Name"
              required
            />
          </div>

          <input
            type="email"
            name="Email Address"
            placeholder="Your Email Address"
            required
          />
          <textarea
            name="Message"
            id=""
            rows="7"
            placeholder="Message"
            required
          ></textarea>
          <button className="btn btn-primary" type="submit">Send Message</button>
        </form>
      </div>
    </div>
  )
}

export default ContactUs