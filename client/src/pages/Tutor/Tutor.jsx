import { useState } from "react";
import "./tutor.css";

const Tutor = () => {
  const [requestSent, setRequestSent] = useState(false);

  const handleRequestClick = () => {
    setRequestSent(true);
  };

  return (
    <div className="tutor-detail-page">
      <div className="left-section">
        <div className="profile-image">
          <img src="https://avatar.iran.liara.run/public/job/teacher/male" alt="Tutor" />
        </div>
        <div className="tutor-info">
          <h2>Tutor Name</h2>
          <p>Email: tutor@example.com</p>
          <p>Phone: +1234567890</p>
          <p>Subject: Math</p>
          <p>Qualifications: Ph.D. in Mathematics</p>
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
