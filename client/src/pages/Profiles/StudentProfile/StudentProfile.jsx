import { useState } from "react";
import "./studentProfile.css";
const StudentProfile = () => {
  const [activeTab, setActiveTab] = useState("overview");

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="profile-page">
      <div className="profile-header">
        <img
          src="https://avatar.iran.liara.run/public/49"
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
            <div className="tutors-section">
              <h3>Assigned Tutors</h3>
              <ul>
                <li>Alak Pandey - Physics</li>
                <li>Sameer Sinha - Mathematics</li>
                <li>Rajiv Mehra - Chemistry</li>
                {/* Add more tutors here */}
              </ul>
            </div>
            <div className="assignments-section">
              <h3>Assignments</h3>
              <ul>
                <li>
                  Assignment 1 - Completed
                  <div className="assignment-actions">
                    <button className="upload-btn">Upload</button>
                    <button className="view-btn">View</button>
                  </div>
                </li>
                <li>
                  Assignment 2 - In Progress
                  <div className="assignment-actions">
                    <button className="upload-btn">Upload</button>
                    <button className="view-btn">View</button>
                  </div>
                </li>
                <li>
                  Assignment 3 - Not Started
                  <div className="assignment-actions">
                    <button className="upload-btn">Upload</button>
                    <button className="view-btn">View</button>
                  </div>
                </li>
                {/* Add more assignments here */}
              </ul>
            </div>
            <button className="logout-btn">Logout</button>
          </div>
        ) : (
          <div className="update-form">
            <h3>Update Profile</h3>
            <form>
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input type="text" id="name" name="name" />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input type="email" id="email" name="email" />
              </div>
              <div className="form-group">
                <label htmlFor="phone">Phone Number</label>
                <input type="tel" id="phone" name="phone" />
              </div>
              <div className="form-group">
                <label htmlFor="gender">Gender</label>
                <select id="gender" name="gender">
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
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
