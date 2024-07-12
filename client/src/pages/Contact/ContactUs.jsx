import { useState } from "react";
import "./contactUs.css";
import axios from "axios";
import { toast } from "react-toastify";
const ContactUs = () => {
  const [contactData, setContactData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setContactData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const [loading, setLoading] = useState(false);

  const API_URL = import.meta.env.VITE_API_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const resp = await axios.post(`${API_URL}/api/contact`, contactData);
      const data = resp.data;
      toast.success("Successfull", {
        style: { background: "rgb(57, 57, 57)", color: "white" },
      });
      setLoading(false);
      setContactData({
        firstName: "",
        lastName: "",
        email: "",
        message: "",
      });
      return data;
    } catch (error) {
      console.log(error);
      setLoading(false);
      toast.error(error, {
        style: { background: "rgb(57, 57, 57)", color: "white" },
      });
    }
  };
  return (
    <div className="contact">
      <div className="container contact_container">
        <aside className="contact_aside">
          <div className="aside_image">
            <img src="https://storysaver.ai/assets/img/contact-us.png" alt="" />
          </div>
          <h2>Contact Me</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sed minus
            optio facere, qui quidem animi vitae beatae quae explicabo expedita
          </p>
          <ul className="contact_details">
            <li>
              <i className="uil uil-phone-times"></i>
              <h5>+91 9439427124</h5>
            </li>
            <li>
              <i className="uil uil-envelope"></i>
              <h5>sushantbishoi.developer@gmail.com</h5>
            </li>
            <li>
              <i className="uil uil-location-point"></i>
              <h5>India</h5>
            </li>
          </ul>
          <ul className="contact_socials">
            <li>
              <a href="">
                <i className="uil uil-facebook-f"></i>
              </a>
            </li>
            <li>
              <a href="">
                <i className="uil uil-instagram"></i>{" "}
              </a>
            </li>
            <li>
              <a href="">
                <i className="uil uil-twitter"></i>{" "}
              </a>
            </li>
          </ul>
        </aside>

        <form className="contact_form" onSubmit={handleSubmit}>
          <div className="form_name">
            <input
              type="text"
              name="firstName"
              value={contactData.firstName}
              placeholder="First Name"
              required
              onChange={handleChange}
            />
            <input
              type="text"
              name="lastName"
              value={contactData.lastName}
              placeholder="Last Name"
              required
              onChange={handleChange}
            />
          </div>

          <input
            type="email"
            name="email"
            value={contactData.email}
            placeholder="Your Email Address"
            required
            onChange={handleChange}
          />
          <textarea
            name="message"
            value={contactData.message}
            id=""
            rows="7"
            placeholder="Message"
            required
            onChange={handleChange}
          ></textarea>
          <button className="btn btn-primary" type="submit" disabled={loading}>
            {loading ? "Sending...." : "Send Message"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactUs;
