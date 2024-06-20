import { useContext, useEffect, useState } from "react";
import "./tutor.css";
import { useParams } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../../components/Context/AuthContext";

const Tutor = () => {
  const {token} = useContext(AuthContext);
  const {tutorId} = useParams();
  const [tutorData, setTutorData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [requestSent, setRequestSent] = useState(false);

  

  useEffect(() => {

    const fetchTutorData = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/users/tutor/${tutorId}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
  
        setTutorData(response.data);
        setLoading(false)
      } catch (error) {
        setLoading(false)
      }
    }

    fetchTutorData();
  }, [tutorId, token]);
  const handleRequestClick = () => {
    setRequestSent(true);
  };

  if (loading) return <div>Loading....</div>

  return (
    <div className="tutor-detail-page">
      <div className="left-section">
        <div className="profile-image">
          <img src={tutorData.profileImage ? tutorData.profileImage : `https://api.dicebear.com/9.x/initials/svg?seed=${tutorData.name}&backgroundColor=00897b,00acc1,039be5,1e88e5,3949ab,43a047,5e35b1,7cb342,8e24aa,c0ca33,d81b60,e53935,f4511e,fb8c00,fdd835,ffb300,c0aede`} alt="Tutor" />
        </div>
        <div className="tutor-info">
          <h2>{tutorData.name}</h2>
          <p>Email: {tutorData.email}</p>
          <p>Phone: {tutorData.phone}</p>
          <p>Subject: {tutorData.subject}</p>
          <p>Qualifications: {tutorData.qualification}</p>
        </div>
        <div className="request-button">
          <button 
            className={`add-request-btn ${requestSent ? "request-sent" : ""}`}
            onClick={handleRequestClick}
            disabled={requestSent}
          >
            {requestSent ? "Request Sent" : "Add"}
          </button>
        </div>
        <div className="feedback-comments glass-effect">
          <h2>Reviews</h2>
          <div className="comment">
            <p><strong>John Doe:</strong> Great tutor! Helped me understand complex topics.</p>
            <div className="stars">★★★★★</div>
          </div>
          <div className="comment">
            <p><strong>Jane Smith:</strong> Very patient and knowledgeable.</p>
            <div className="stars">★★★★☆</div>
          </div>
        </div>
      </div>
      <div className="right-section">
        <div className="availability-card glass-effect">
          <h2>Availability</h2>
          <p>Time Slots: Monday to Friday, 9AM - 5PM</p>
          <p>No. of Classes per Week: 5</p>
          <p>Fees per Month: $200</p>
          <button className="btn" style={{margin: "auto", marginTop: "12px", cursor: "pointer"}}>Book Demo</button>
        </div>
        <div className="feedback-form glass-effect">
          <h2>Submit Feedback</h2>
          <form>
            <div className="form-group">
              <label htmlFor="feedback-name">Name</label>
              <input type="text" id="feedback-name" name="feedback-name" />
            </div>
            <div className="form-group">
              <label htmlFor="feedback-comment">Comment</label>
              <textarea id="feedback-comment" name="feedback-comment"></textarea>
            </div>
            <button type="submit" className="btn" style={{margin: "auto", marginTop: "12px", cursor: "pointer"}}>Submit Feedback</button>
          </form>
        </div>
        
      </div>
    </div>
  );
};

export default Tutor;
