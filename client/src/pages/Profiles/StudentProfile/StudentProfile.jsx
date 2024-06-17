import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../components/Context/AuthContext";
import "./studentProfile.css";
import axios from "axios";

const StudentProfile = () => {
  const { user, token, logout } = useContext(AuthContext);
  const [activeTab, setActiveTab] = useState("overview");
  const [assignedTutors, setAssignedTutors] = useState([]);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  useEffect(() => {
    const fetchTutors = async () => {
      try {
        const tutorPromises = user.tutors.map(async (tutorId) => {
          const response = await axios.get(
            `http://localhost:8000/api/users/assigned-users/${tutorId}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          console.log("data", response);
          return response.data;
        });
        const tutors = await Promise.all(tutorPromises);
        setAssignedTutors(tutors);
      } catch (error) {
        console.error("Error fetching tutors:", error);
      }
    };

    if (user.tutors.length > 0) {
      fetchTutors();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user.tutors]); // Execute whenever user.tutors change

  return (
    <div className="profile-page">
      <div className="profile-header">
        <img
          src={
            user.profileImage
              ? user.profileImage
              : "https://avatar.iran.liara.run/public/49"
          }
          alt="Profile"
          className="profile-image"
        />
        <div className="profile-tabs">
          <button
            className={activeTab === "overview" ? "active" : ""}
            onClick={() => handleTabChange("overview")}
          >
            Overview
          </button>
          <button
            className={activeTab === "update" ? "active" : ""}
            onClick={() => handleTabChange("update")}
          >
            Update
          </button>
        </div>
      </div>
      <div className="profile-content">
        {activeTab === "overview" ? (
          <div className="overview">
            <div className="profile-info">
              <h3>User Profile Information</h3>
              <p>
                <strong>Name:</strong> {user.name}
              </p>
              <p>
                <strong>Email:</strong> {user.email}
              </p>
              <p>
                <strong>Age:</strong> {user.age}
              </p>
              <p>
                <strong>Phone:</strong> {user.phone}
              </p>
              <p>
                <strong>Class:</strong> {user.class}
              </p>
              <p>
                <strong>Gender:</strong> {user.gender}
              </p>
            </div>
            <div className="tutors-section">
              <h3>Assigned Tutors</h3>
              <ul>
                {assignedTutors.length > 0 ? (
                  assignedTutors.map((tutor) => (
                    <li key={tutor._id}>
                      {tutor.name} - {tutor.subject}
                    </li>
                  ))
                ) : (
                  <li>No assigned tutors found.</li>
                )}
              </ul>
            </div>
            <div className="assignments-section">
              <h3>Assignments</h3>
              <ul>
                <li>Assignment 1 - Completed</li>
                <li>Assignment 2 - In Progress</li>
                <li>Assignment 3 - Not Started</li>
                {/* Add more assignments here */}
              </ul>
            </div>
            <button className="logout-btn" onClick={logout}>
              Logout
            </button>
          </div>
        ) : (
          <div className="update-form">
            <h3>Update Profile</h3>
            <form>
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  defaultValue={user.name}
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  defaultValue={user.email}
                />
              </div>
              <div className="form-group">
                <label htmlFor="phone">Phone Number</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  defaultValue={user.phone}
                />
              </div>
              <div className="form-group">
                <label htmlFor="class">Class</label>
                <input
                  type="text"
                  id="class"
                  name="class"
                  defaultValue={user.class}
                />
              </div>
              <div className="form-group">
                <label htmlFor="profile-image">Profile Image</label>
                <input type="file" id="profile-image" name="profile-image" />
              </div>
              <button type="submit" className="update-btn">
                Update
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentProfile;
