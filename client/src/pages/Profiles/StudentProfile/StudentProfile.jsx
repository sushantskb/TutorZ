import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../components/Context/AuthContext";
import "./studentProfile.css";
import axios from "axios";
import { toast } from "react-toastify";

const StudentProfile = () => {
  const { user, token, logout } = useContext(AuthContext); // Removed isLoading from AuthContext
  const [activeTab, setActiveTab] = useState("overview");
  const [assignedTutors, setAssignedTutors] = useState([]);
  const [isLoading, setIsLoading] = useState(false); // Local isLoading state

  const [formData, setFormData] = useState({
    name: user.name,
    email: user.email,
    phone: user.phone,
    profileImage: null,
    class: user.class,
  });

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
        class: formData.class,
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
      toast.success("Updated successfully");
      // Optionally, you can update the user context with the new data
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Error updating profile");
    } finally {
      setIsLoading(false); // Set isLoading to false after update process ends
    }
  };

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
        return response.data;
      });
      const tutors = await Promise.all(tutorPromises);
      setAssignedTutors(tutors);
    } catch (error) {
      console.error("Error fetching tutors:", error);
    }
  };

  useEffect(() => {
    if (user.tutors.length > 0) {
      fetchTutors();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user.tutors]); // Execute whenever user.tutors change

  const handleRemoveTutor = async (tutorId) => {
    try {
        await axios.delete(
        `http://localhost:8000/api/users/remove-user/${tutorId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Tutor removed successfully");
      fetchTutors();
    } catch (error) {
      console.error("Error removing tutor:", error);
      toast.error("Error removing tutor");
    }
  };

  return (
    <div className="profile-page">
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
                      <button className="remove-btn" onClick={() => handleRemoveTutor(tutor._id)}>
                        Remove
                      </button>
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
            <form onSubmit={handleUpdateProfile}>
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="phone">Phone Number</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="class">Class</label>
                <input
                  type="text"
                  id="class"
                  name="class"
                  value={formData.class}
                  onChange={handleInputChange}
                />
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
                  Updating...
                </button>
              ) : (
                <button type="submit" className="update-btn">
                  Update
                </button>
              )}
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentProfile;
