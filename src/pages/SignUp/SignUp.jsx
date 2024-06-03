import { useState } from "react";
import "./signup.css";
import SignUp_Img from "../../assets/signup.png";
import { Link } from "react-router-dom";
const SignUp = () => {
    const [role, setRole] = useState('');

    const handleRoleChange = (e) => {
      setRole(e.target.value);
    };
  
    return (
      <div className="signup-page">
        <div className="signup-illustration">
          <img src={SignUp_Img} alt="Illustration" />
        </div>
        <div className="signup-form">
          <h2>Sign Up</h2>
          <form>
            <div className="form-group half-width">
              <label htmlFor="name">Name</label>
              <input type="text" id="name" name="name" />
            </div>
            <div className="form-group half-width">
              <label htmlFor="email">Email</label>
              <input type="email" id="email" name="email" />
            </div>
            <div className="form-group half-width">
              <label htmlFor="age">Age</label>
              <input type="number" id="age" name="age" />
            </div>
            <div className="form-group half-width">
              <label htmlFor="phone">Phone Number</label>
              <input type="tel" id="phone" name="phone" />
            </div>
            <div className="form-group full-width">
              <label htmlFor="role">Role</label>
              <select id="role" name="role" value={role} onChange={handleRoleChange}>
                <option value="">Select Role</option>
                <option value="student">Student</option>
                <option value="teacher">Teacher</option>
              </select>
            </div>
  
            {role === 'student' && (
              <>
                <div className="form-group half-width">
                  <label htmlFor="class">Class</label>
                  <input type="text" id="class" name="class" />
                </div>
                <div className="form-group full-width">
                  <label>Gender</label>
                  <div className="radio-group">
                    <label htmlFor="male-student">
                      <input type="radio" id="male-student" name="gender-student" value="male" />
                      Male
                    </label>
                    <label htmlFor="female-student">
                      <input type="radio" id="female-student" name="gender-student" value="female" />
                      Female
                    </label>
                  </div>
                </div>
                <div className="form-group full-width">
                  <label htmlFor="profile-image-student">Profile Image</label>
                  <input type="file" id="profile-image-student" name="profile-image-student" />
                </div>
              </>
            )}
  
            {role === 'teacher' && (
              <>
                <div className="form-group half-width">
                  <label htmlFor="subject">Subject</label>
                  <input type="text" id="subject" name="subject" />
                </div>
                <div className="form-group half-width">
                  <label htmlFor="qualification">Qualification</label>
                  <input type="text" id="qualification" name="qualification" />
                </div>
                <div className="form-group half-width">
                  <label htmlFor="experience">Experience</label>
                  <input type="text" id="experience" name="experience" />
                </div>
                <div className="form-group half-width">
                  <label htmlFor="time-slots">Time Slots</label>
                  <input type="text" id="time-slots" name="time-slots" />
                </div>
                <div className="form-group half-width">
                  <label htmlFor="classes-per-week">Classes per Week</label>
                  <input type="number" id="classes-per-week" name="classes-per-week" />
                </div>
                <div className="form-group half-width">
                  <label htmlFor="fees">Fees</label>
                  <input type="number" id="fees" name="fees" />
                </div>
                <div className="form-group full-width">
                  <label htmlFor="profile-image-teacher">Profile Image</label>
                  <input type="file" id="profile-image-teacher" name="profile-image-teacher" />
                </div>
              </>
            )}

            <p>Already have an account? <Link to='/login'><span>Login</span></Link></p>
  
            <button type="submit" className="btn btn-primary">
              Sign Up
            </button>
          </form>
        </div>
      </div>
    );
};

export default SignUp;
