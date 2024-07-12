import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../components/Context/AuthContext";
import "./studentProfile.css";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const StudentProfile = () => {
  const { user, token, logout } = useContext(AuthContext);
  const [activeTab, setActiveTab] = useState("overview");
  const [assignedTutors, setAssignedTutors] = useState([]);
  const [bookings, setBookings] = useState([]); // State for bookings
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: user.name,
    email: user.email,
    phone: user.phone,
    profileImage: null,
    class: user.class,
  });

  const API_URL = import.meta.env.VITE_API_URL;

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
    setIsLoading(true);
    try {
      let profileImageUrl = user.profileImage;

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

      const response = await axios.put(`${API_URL}/api/users/profile/me`, updatedUser, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log(response);
      toast.success("Updated successfully", {
        style: { background: "rgb(57, 57, 57)", color: "white" },
      });
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Error updating profile", {
        style: { background: "rgb(57, 57, 57)", color: "white" },
      });
    } finally {
      setIsLoading(false);
    }
  };

  const fetchTutors = async () => {
    try {
      const tutorPromises = user.tutors.map(async (tutorId) => {
        const response = await axios.get(
          `${API_URL}/api/users/assigned-users/${tutorId}`,
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

  const fetchBookings = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/bookings/${user._id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setBookings(response.data.bookings); // Update state with bookings array
    } catch (error) {
      console.error("Error fetching bookings:", error);
    }
  };
  console.log(bookings);

  const handleRemoveTutor = async (tutorId) => {
    try {
      await axios.delete(`${API_URL}/api/users/remove-user/${tutorId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success("Tutor removed successfully", {
        style: { background: "rgb(57, 57, 57)", color: "white" },
      });
      fetchTutors();
    } catch (error) {
      console.error("Error removing tutor:", error);
      toast.error("Error removing tutor", {
        style: { background: "rgb(57, 57, 57)", color: "white" },
      });
    }
  };

  const handleCancelBooking = async (bookingId) => {
    try {
      await axios.put(
        `${API_URL}/api/bookings/cancel-booking/${bookingId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      navigate(0);
      toast.success("Booking cancelled successfully", {
        style: { background: "rgb(57, 57, 57)", color: "white" },
      });

      fetchBookings();
    } catch (error) {
      console.error("Error cancelling booking:", error);
      toast.error("Error cancelling booking", {
        style: { background: "rgb(57, 57, 57)", color: "white" },
      });
    }
  };

  useEffect(() => {
    if (user.tutors.length > 0) {
      fetchTutors();
    }
    fetchBookings();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user.tutors]);

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
          <button
            className={activeTab === "bookings" ? "active" : ""}
            onClick={() => handleTabChange("bookings")}
          >
            My Bookings
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
            <div className="tutors-section">
              <h3>Assigned Tutors</h3>
              <ul>
                {assignedTutors.length > 0 ? (
                  assignedTutors.map((tutor) => (
                    <li key={tutor._id}>
                      {tutor.name} - {tutor.subject}
                      <button
                        className="remove-btn"
                        onClick={() => handleRemoveTutor(tutor._id)}
                      >
                        Remove
                      </button>
                    </li>
                  ))
                ) : (
                  <li>No assigned tutors found.</li>
                )}
              </ul>
            </div>
            <button className="logout-btn" onClick={logout}>
              Logout
            </button>
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
        {activeTab === "bookings" && (
          <div className="bookings-section">
            <h3>My Bookings</h3>
            <div className="card-container">
              {bookings.length > 0 ? (
                bookings.map((booking) => (
                  <div className="card" key={booking.slotInfo.teacherId}>
                    <div className="card-header">
                      <h3 className="card-title">
                        <img src={booking.teacherInfo.profileImage} />
                      </h3>
                    </div>
                    <div className="card-content">
                      <p className="card-name">{booking.teacherInfo.name}</p>
                    </div>
                    <div className="card-footer">
                      <button
                        className="card-button"
                        onClick={() => handleCancelBooking(booking._id)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <p>no bookings</p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentProfile;
