import { useState } from 'react'
import "./tutorProfile.css"
const TutorProfile = () => {
    const [activeTab, setActiveTab] = useState('overview');

    const [selectedAssignment, setSelectedAssignment] = useState(null);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const handleUpdateStatusClick = (assignment) => {
    setSelectedAssignment(assignment);
  };

  const handleStatusUpdate = (status) => {
    // Handle status update logic here
    console.log(`Updating status of ${selectedAssignment} to ${status}`);
    // Clear selected assignment after status update
    setSelectedAssignment(null);
  };

  return (
    <div className="tutor-profile-page">
      <div className="profile-header">
        <img
          src="https://avatar.iran.liara.run/public/job/teacher/male"
          alt="Profile"
          className="profile-image"
        />
        <div className="profile-tabs">
          <button
            className={activeTab === 'overview' ? 'active' : ''}
            onClick={() => handleTabChange('overview')}
          >
            Overview
          </button>
          <button
            className={activeTab === 'create-assignment' ? 'active' : ''}
            onClick={() => handleTabChange('create-assignment')}
          >
            Create Assignment
          </button>
          <button
            className={activeTab === 'update' ? 'active' : ''}
            onClick={() => handleTabChange('update')}
          >
            Update
          </button>
        </div>
      </div>
      <div className="profile-content">
        {activeTab === 'overview' ? (
          <div className="overview">
            <div className="students-section">
              <h3>Assigned Students</h3>
              <ul>
                <li>
                  John Doe - 10:00 AM - 11:00 AM
                  <button className="send-email-btn">Send Email</button>
                </li>
                <li>
                  Jane Smith - 11:00 AM - 12:00 PM
                  <button className="send-email-btn">Send Email</button>
                </li>
                <li>
                  Bob Johnson - 1:00 PM - 2:00 PM
                  <button className="send-email-btn">Send Email</button>
                </li>
                {/* Add more students here */}
              </ul>
            </div>
          </div>
        ) : activeTab === 'create-assignment' ? (
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
                <label htmlFor="student">Student</label>
                <select id="student" name="student">
                  <option value="john-doe">John Doe</option>
                  <option value="jane-smith">Jane Smith</option>
                  <option value="bob-johnson">Bob Johnson</option>
                  {/* Add more students here */}
                </select>
              </div>
              <button type="submit" className="create-assignment-btn">Create</button>
            </form>
            <div className="assignments-list">
              <h3>Assignments</h3>
              <ul>
                <li>
                  John Doe - Assignment 1
                  <button className="update-status-btn" onClick={() => handleUpdateStatusClick('Assignment 1')}>Update Status</button>
                  <button className="view-submits-btn">View Submits</button>
                </li>
                <li>
                  Jane Smith - Assignment 2
                  <button className="update-status-btn" onClick={() => handleUpdateStatusClick('Assignment 2')}>Update Status</button>
                  <button className="view-submits-btn">View Submits</button>
                </li>
                <li>
                  Bob Johnson - Assignment 3
                  <button className="update-status-btn" onClick={() => handleUpdateStatusClick('Assignment 3')}>Update Status</button>
                  <button className="view-submits-btn">View Submits</button>
                </li>
                {/* Add more assignments here */}
              </ul>
            </div>
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
                <label htmlFor="subject">Subject</label>
                <input type="text" id="subject" name="subject" />
              </div>
              <div className="form-group">
                <label htmlFor="slots">Slots</label>
                <div className="slots-inputs">
                  <input type="text" id="timings" name="timings" placeholder="Timings" />
                  <input type="number" id="days" name="days" placeholder="No. of Days" />
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="profile-image">Profile Image</label>
                <input type="file" id="profile-image" name="profile-image" />
              </div>
              <button type="submit" className="update-btn">Update</button>
            </form>
          </div>
        )}
      </div>

      {selectedAssignment && (
        <div className="assignment-status-form">
          <h3>Update Status</h3>
          <select onChange={(e) => handleStatusUpdate(e.target.value)}>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
        </div>
      )}
    </div>
  );
}

export default TutorProfile