import "./tutor.css";
const Tutor = () => {
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
      </div>
      <div className="right-section">
        <div className="availability-card glass-effect">
          <h2>Availability</h2>
          <p>Time Slots: Monday to Friday, 9AM - 5PM</p>
          <p>No. of Classes per Week: 5</p>
          <p>Fees per Month: $200</p>
          <button className="btn" style={{margin: "auto", marginTop: "12px", cursor: "pointer"}}>Book Demo</button>
        </div>
      </div>
    </div>
  );
};

export default Tutor;
