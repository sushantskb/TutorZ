import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../components/Context/AuthContext";
import "./tutorProfile.css";
import axios from "axios";
import { toast } from "react-toastify";

const TutorProfile = () => {
  const { user, token, logout } = useContext(AuthContext);
  const [activeTab, setActiveTab] = useState("overview");
  const [assignedStudents, setAssignedStudents] = useState([]);
  const [pendingRequests, setPendingRequests] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: user.name,
    email: user.email,
    phone: user.phone,
    subject: user.subject,
    slots: user.slots,
    classesPerWeek: user.classesPerWeek,
    profileImage: null,
  });

  console.log("User: ", user);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  // handle profile update
  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setIsLoading(true); // Set isLoading to true when update process starts
    try {
      let profileImageUrl = user.profileImage;

      // If there's a new profile image
      if (
        formData.profileImage &&
        formData.profileImage !== user.profileImage
      ) {
        const imageData = new FormData();
        imageData.append("file", formData.profileImage);
        imageData.append("upload_preset", "tutorz");
        imageData.append("cloud_name", "dbgght6ld");

        const uploadResponse = await fetch(
          "https://api.cloudinary.com/v1_1/dbgght6ld/image/upload",
          {
            method: "POST",
            body: imageData,
          }
        );

        const uploadData = await uploadResponse.json();
        profileImageUrl = uploadData.secure_url;
      }

      const updatedUser = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        subject: formData.subject,
        slots: formData.slots,
        classesPerWeek: formData.classesPerWeek,
        profileImage: profileImageUrl,
      };

      const response = await axios.put(
        "http://localhost:8000/api/users/profile/me",
        updatedUser,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(response);
      // Handle success
      toast.success("Updated successfully", {
        style: { background: "rgb(57, 57, 57)", color: "white" },
      });
      // Optionally, you can update the user context with the new data
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Error updating profile", {
        style: { background: "rgb(57, 57, 57)", color: "white" },
      });
    } finally {
      setIsLoading(false); // Set isLoading to false after update process ends
    }
  };

  const fetchStudents = async () => {
    try {
      const studentPromises = user.students.map(async (studentId) => {
        const response = await axios.get(
          `http://localhost:8000/api/users/assigned-users/${studentId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        return response.data;
      });
      const students = await Promise.all(studentPromises);
      setAssignedStudents(students);
    } catch (error) {
      console.error("Error fetching students: ", error);
    }
  };

  // request for fetching students
  useEffect(() => {
    fetchStudents();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user.students]);

  // request for fetching the pending requests
  useEffect(() => {
    const fetchPendingRequests = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/users/pending-requests",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setPendingRequests(response.data);
      } catch (error) {
        console.error("Error fetching pending requests: ", error);
        toast.error("Error fetching pending requests");
      }
    };

    fetchPendingRequests();
  }, [token]);

  // handle approve tutor request
  const handleApproveRequest = async (studentId) => {
    try {
      const response = await axios.post(
        `http://localhost:8000/api/users/approve-tutor/${studentId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(response);
      // Update pending requests after approval
      setPendingRequests((prevRequests) =>
        prevRequests.filter((request) => request._id !== studentId)
      );
      toast.success("Tutor request approved successfully");
    } catch (error) {
      console.error("Error approving tutor request:", error);
      toast.error("Error approving tutor request");
    }
  };

  const handleRemoveStudent = async (studentId) => {
    try {
      await axios.delete(
        `http://localhost:8000/api/users/remove-user/${studentId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Student removed successfully", {
        style: { background: "rgb(57, 57, 57)", color: "white" },
      });
      fetchStudents();
    } catch (error) {
      console.error("Error removing tutor:", error);
      toast.error("Error removing tutor", {
        style: { background: "rgb(57, 57, 57)", color: "white" }
      });
    }
  };

  return (
    <div className="tutor-profile-page">
      <div className="profile-header">
        <img
          src={
            user.profileImage
              ? user.profileImage
              : `https://api.dicebear.com/9.x/initials/svg?seed=${user.name}&backgroundColor=00897b,00acc1,039be5,1e88e5,3949ab,43a047,5e35b1,7cb342,8e24aa,c0ca33,d81b60,e53935,f4511e,fb8c00,fdd835,ffb300,c0aede`
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
                      <button
                        onClick={() => handleRemoveStudent(student._id)}
                        className="send-email-btn"
                      >
                        Remove
                      </button>
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
            <form onSubmit={handleUpdateProfile}>
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name} // Updated binding
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email} // Updated binding
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="phone">Phone Number</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone} // Updated binding
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="subject">Subject</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject} // Updated binding
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="slots">Slots</label>
                <div className="slots-inputs">
                  <input
                    type="text"
                    id="slots"
                    name="slots"
                    placeholder="Timings"
                    value={formData.slots} // Updated binding
                    onChange={handleInputChange}
                  />
                  <input
                    type="number"
                    id="classesPerWeek"
                    name="classesPerWeek"
                    placeholder="No. of Days"
                    value={formData.classesPerWeek} // Updated binding
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="profileImage">Profile Image</label>
                <input
                  type="file"
                  id="profileImage"
                  name="profileImage"
                  onChange={handleInputChange}
                />
              </div>
              {isLoading ? (
                <button disabled={true} type="submit" className="update-btn">
                  Updating....
                </button>
              ) : (
                <button type="submit" className="update-btn">
                  Update
                </button>
              )}
            </form>
          </div>
        )}
        {activeTab === "requests" && (
          <div className="requests">
            <h3>Student Requests</h3>
            <ul>
              {pendingRequests.length > 0 ? (
                pendingRequests.map((request) => (
                  <li key={request._id}>
                    {request.name}
                    <button
                      className="accept-btn"
                      onClick={() => handleApproveRequest(request._id)}
                    >
                      Accept
                    </button>
                    <button className="decline-btn">Decline</button>
                  </li>
                ))
              ) : (
                <li>No pending requests.</li>
              )}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default TutorProfile;
