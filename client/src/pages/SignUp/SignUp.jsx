import { useEffect, useState } from "react";
import "./signup.css";
import SignUp_Img from "../../assets/signup.png";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { signup, clearError } from "../../hooks/slices/authSlice";
import { toast } from "react-toastify";

const SignUp = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    age: "",
    phone: "",
    role: "",
    class: "",
    gender: "",
    profileImage: null,
    subject: "",
    qualification: "",
    experience: "",
    timeSlots: "",
    classesPerWeek: "",
    fees: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(clearError());
  }, [dispatch]);


  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const filteredFormData = {
      name: formData.name,
      email: formData.email,
      password: formData.password,
      age: formData.age,
      phone: formData.phone,
      role: formData.role,
      gender: formData.gender,
      profileImage: formData.profileImage,
      ...(formData.role === "student" && { class: formData.class }),
      ...(formData.role === "tutor" && {
        subject: formData.subject,
        qualification: formData.qualification,
        experience: formData.experience,
        timeSlots: formData.timeSlots,
        classesPerWeek: formData.classesPerWeek,
        fees: formData.fees,
      }),
    }

      const resultAction = await dispatch(signup(filteredFormData));
      if(signup.fulfilled.match(resultAction)){
        toast.success("Registeration Success!", {
          style: { background: "rgb(57, 57, 57)", color: "white" },
        });
        navigate("/");
      } else if(signup.rejected.match(resultAction)){
        toast.error(resultAction.payload || "Login failed. Please try again.", {
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
          <div className="form-group full-width">
            <label>Gender</label>
            <div className="radio-group">
              <label htmlFor="male-student">
                <input
                  type="radio"
                  id="male-student"
                  name="gender"
                  value="male"
                  onChange={handleInputChange}
                />
                Male
              </label>
              <label htmlFor="female-student">
                <input
                  type="radio"
                  id="female-student"
                  name="gender"
                  value="female"
                  onChange={handleInputChange}
                />
                Female
              </label>
            </div>
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
                  onChange={handleInputChange}
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
                <label htmlFor="timeSlots">Time Slots</label>
                <input
                  type="text"
                  id="timeSlots"
                  name="timeSlots"
                  value={formData.timeSlots}
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
              <div className="form-group half-width">
                <label htmlFor="fees">Fees</label>
                <input
                  type="number"
                  id="fees"
                  name="fees"
                  value={formData.fees}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group full-width">
                <label htmlFor="profileImage">Profile Image</label>
                <input
                  type="file"
                  id="profileImage"
                  name="profileImage"
                  onChange={handleInputChange}
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
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
