import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../components/Context/AuthContext";
import "./tutorProfile.css";
import axios from "axios";

const TutorProfile = () => {
  const { user, token, logout } = useContext(AuthContext);
  const [activeTab, setActiveTab] = useState("overview");
  const [assignedStudents, setAssignedStudents] = useState([]);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const studentPromises = user.students.map(async (studentId) => {
          const resposne = await axios.get(
            `http://localhost:8000/api/users/assigned-users/${studentId}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          return resposne.data;
        });
        const students = await Promise.all(studentPromises);
        setAssignedStudents(students);
      } catch (error) {
        console.error("Error fetching students: ", error);
      }
    };
    fetchStudents();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user.students]);

  return (
    <div className="tutor-profile-page">
      <div className="profile-header">
        <img
          src={
            user.profileImage
              ? user.profileImage
              : "https://avatar.iran.liara.run/public/job/teacher/male"
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
            className={activeTab === "create-assignment" ? "active" : ""}
            onClick={() => handleTabChange("create-assignment")}
          >
            Create Assignment
          </button>
          <button
            className={activeTab === "update" ? "active" : ""}
            onClick={() => handleTabChange("update")}
          >
            Update
          </button>
          <button
            className={activeTab === "requests" ? "active" : ""}
            onClick={() => handleTabChange("requests")}
          >
            Requests
          </button>
        </div>
      </div>
      <div className="profile-content">
        {activeTab === "overview" && (
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
            <div className="students-section">
              <h3>Assigned Students</h3>

              {assignedStudents.length > 0 ? (
                assignedStudents.map((student) => (
                  <ul key={student._id}>
                    <li>
                      {student.name}
                      <button className="send-email-btn">Send Email</button>
                    </li>
                  </ul>
                ))
              ) : (
                <li>No assigned student found.</li>
              )}
            </div>
            <button className="btn" onClick={logout}>
              Logout
            </button>
          </div>
        )}
        {activeTab === "create-assignment" && (
          <div className="create-assignment">
            <h3>Create Assignment</h3>
            <form className="create-assignment-form">
              <div className="form-group">
                <label htmlFor="title">Title</label>
                <input type="text" id="title" name="title" />
              </div>
              <div className="form-group">
                <label htmlFor="status">Status</label>
                <select id="status" name="status">
                  <option value="in-progress">In Progress</option>
                  <option value="not-started">Not Started</option>
                  <option value="completed">Completed</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="assignmentFile" className="file-upload-label">
                  <span className="file-upload-icon">📁</span>
                  Upload Assignment
                </label>
                <input
                  type="file"
                  id="assignmentFile"
                  name="assignmentFile"
                  className="custom-file-upload"
                />
              </div>

              <div className="form-group">
                <label htmlFor="student">Student</label>
                <select id="student" name="student">
                  <option value="john-doe">John Doe</option>
                  <option value="jane-smith">Jane Smith</option>
                  <option value="bob-johnson">Bob Johnson</option>
                </select>
              </div>
              <button type="submit" className="create-assignment-btn">
                Create
              </button>
            </form>
            <div className="assignments-list">
              <h3>Assignments</h3>
              <ul>
                <li>
                  John Doe - Assignment 1
                  <button className="update-status-btn">Update Status</button>
                  <button className="view-submits-btn">View Submits</button>
                </li>
                <li>
                  Jane Smith - Assignment 2
                  <button className="update-status-btn">Update Status</button>
                  <button className="view-submits-btn">View Submits</button>
                </li>
                <li>
                  Bob Johnson - Assignment 3
                  <button className="update-status-btn">Update Status</button>
                  <button className="view-submits-btn">View Submits</button>
                </li>
              </ul>
            </div>
          </div>
        )}
        {activeTab === "update" && (
          <div className="update-form">
            <h3>Update Profile</h3>
            <form>
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input type="text" id="name" name="name" defaultValue={user.name} />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input type="email" id="email" name="email" defaultValue={user.email} />
              </div>
              <div className="form-group">
                <label htmlFor="phone">Phone Number</label>
                <input type="tel" id="phone" name="phone" defaultValue={user.phone} />
              </div>
              <div className="form-group">
                <label htmlFor="subject">Subject</label>
                <input type="text" id="subject" name="subject" defaultValue={user.subject} />
              </div>
              <div className="form-group">
                <label htmlFor="slots">Slots</label>
                <div className="slots-inputs">
                  <input
                    type="text"
                    id="timings"
                    name="timings"
                    placeholder="Timings"
                    defaultValue={user.timeSlots}
                  />
                  <input
                    type="number"
                    id="days"
                    name="days"
                    placeholder="No. of Days"
                    defaultValue={user.classesPerWeek}
                  />
                </div>
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
        {activeTab === "requests" && (
          <div className="requests">
            <h3>Student Requests</h3>
            <ul>
              <li>
                Alice Johnson
                <button className="accept-btn">Accept</button>
                <button className="decline-btn">Decline</button>
              </li>
              <li>
                Michael Brown
                <button className="accept-btn">Accept</button>
                <button className="decline-btn">Decline</button>
              </li>
              <li>
                Emily Davis
                <button className="accept-btn">Accept</button>
                <button className="decline-btn">Decline</button>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default TutorProfile;
