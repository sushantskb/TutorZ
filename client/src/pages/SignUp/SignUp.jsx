import { useContext, useState } from "react";
import "./signup.css";
import SignUp_Img from "../../assets/signup.png";
import { Link } from "react-router-dom";
import { AuthContext } from "../../components/Context/AuthContext";
import { toast } from "react-toastify";

const SignUp = () => {
  const { signup, loading, error } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    age: "",
    phone: "",
    role: "",
    class: "",
    gender: "",
    subject: "",
    qualification: "",
    experience: "",
    classesPerWeek: "",
    profileImage: null,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData({ ...formData, [name]: files[0] });
  };

  const uploadImageToCloudinary = async () => {
    try {
      const image = new FormData();
      image.append("file", formData.profileImage);
      image.append("upload_preset", "tutorz");
      image.append("cloud_name", "dbgght6ld");

      const response = await fetch(
        "https://api.cloudinary.com/v1_1/dbgght6ld/image/upload",
        {
          method: "POST",
          body: image,
        }
      );

      const data = await response.json();
      // console.log("Cloudinary response data:", data);

      if (!response.ok) {
        throw new Error(data.error.message || "Image upload failed");
      }

      return data.secure_url;
    } catch (error) {
      console.error("Error uploading image to Cloudinary:", error);
      throw error;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const profileImageURL = await uploadImageToCloudinary();

      const filteredData = {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        age: formData.age,
        phone: formData.phone,
        role: formData.role,
        gender: formData.gender,
        profileImage: profileImageURL,
        ...(formData.role === "student" && { class: formData.class }),
        ...(formData.role === "tutor" && {
          subject: formData.subject,
          qualification: formData.qualification,
          experience: formData.experience,
          classesPerWeek: formData.classesPerWeek,
        }),
      };

      await signup(filteredData);
      if (error) {
        toast.error(error, {
          style: { background: "rgba(247, 88, 66, 0.4)", color: "white" },
        });
      } else {
        toast.success("Signup Success!", {
          style: { background: "rgb(57, 57, 57)", color: "white" },
        });
      }
    } catch (error) {
      toast.error(error.message, {
        style: { background: "rgba(247, 88, 66, 0.4)", color: "white" },
      });
    }
  };

  return (
    <div className="signup-page">
      <div className="signup-illustration">
        <img src={SignUp_Img} alt="Illustration" />
      </div>
      <div className="signup-form">
        <h2>Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group half-width">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group half-width">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group half-width">
            <label htmlFor="age">Age</label>
            <input
              type="number"
              id="age"
              name="age"
              value={formData.age}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group half-width">
            <label htmlFor="phone">Phone Number</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group half-width">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group half-width">
            <label htmlFor="gender">Gender</label>
            <input
              type="text"
              id="gender"
              name="gender"
              value={formData.gender}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group full-width">
            <label htmlFor="role">Role</label>
            <select
              id="role"
              name="role"
              value={formData.role}
              onChange={handleInputChange}
            >
              <option value="">Select Role</option>
              <option value="student">Student</option>
              <option value="tutor">Tutor</option>
            </select>
          </div>

          {formData.role === "student" && (
            <>
              <div className="form-group half-width">
                <label htmlFor="class">Class</label>
                <input
                  type="text"
                  id="class"
                  name="class"
                  value={formData.class}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group full-width">
                <label htmlFor="profileImage">Profile Image</label>
                <input
                  type="file"
                  id="profileImage"
                  name="profileImage"
                  onChange={handleFileChange}
                />
              </div>
            </>
          )}

          {formData.role === "tutor" && (
            <>
              <div className="form-group half-width">
                <label htmlFor="subject">Subject</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group half-width">
                <label htmlFor="qualification">Qualification</label>
                <input
                  type="text"
                  id="qualification"
                  name="qualification"
                  value={formData.qualification}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group half-width">
                <label htmlFor="experience">Experience</label>
                <input
                  type="text"
                  id="experience"
                  name="experience"
                  value={formData.experience}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group half-width">
                <label htmlFor="classesPerWeek">Classes per Week</label>
                <input
                  type="number"
                  id="classesPerWeek"
                  name="classesPerWeek"
                  value={formData.classesPerWeek}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group full-width">
                <label htmlFor="profileImage">Profile Image</label>
                <input
                  type="file"
                  id="profileImage"
                  name="profileImage"
                  onChange={handleFileChange}
                />
              </div>
            </>
          )}

          <p>
            Already have an account?{" "}
            <Link to="/login">
              <span>Login</span>
            </Link>
          </p>

          <button type="submit" className="btn btn-primary">
            {loading ? "Signing Up..." : "Sign Up"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
