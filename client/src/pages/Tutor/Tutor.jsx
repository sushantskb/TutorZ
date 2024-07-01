import { useContext, useEffect, useState } from "react";
import "./tutor.css";
import { useParams } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../../components/Context/AuthContext";
import Loader from "../../components/Loader/Loader";
import { toast } from "react-toastify";
import { convertToStandardDate } from "../../utils/dateFormater";

const Tutor = () => {
  const { token } = useContext(AuthContext);
  const { tutorId } = useParams();
  const [tutorData, setTutorData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [requestSent, setRequestSent] = useState(false);
  const [requestApproved, setRequestApproved] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [slots, setSlots] = useState([]);
  const [error, setError] = useState(null);

  const [feedback, setFeedBack] = useState({
    title: "",
    content: "",
    rating: 0,
  });

  useEffect(() => {
    const fetchTutorData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/users/tutor/${tutorId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setTutorData(response.data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        setError(error);
      }
    };

    const checkIfTutorAdded = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/users/check-tutor/${tutorId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.data.added) {
          setRequestSent(true);
          setRequestApproved(true);
        }
      } catch (error) {
        console.log(error);
        setError(error);
      }
    };

    const fetchReviews = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/reviews/all-reviews/${tutorId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setReviews(response.data.reviews);
      } catch (error) {
        setError(error);
      }
    };

    const fetchSlots = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/slots/${tutorId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setSlots(response.data.slots);
      } catch (error) {
        setError(error);
      }
    };

    fetchTutorData();
    checkIfTutorAdded();
    fetchReviews();
    fetchSlots();
  }, [tutorId, token]);

  console.log("slots", slots);

  const handleRequestClick = async () => {
    try {
      const resposne = await axios.post(
        `http://localhost:8000/api/users/add-tutor/${tutorId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (resposne.status === 200) {
        setRequestSent(true);
      }
    } catch (error) {
      console.log(error);
      setError(error);
    }
  };

  const handleFeedbackChange = (e) => {
    const { name, value } = e.target;
    setFeedBack((prevFeedback) => ({
      ...prevFeedback,
      [name]: value,
    }));
  };

  const handleFeedbackSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `http://localhost:8000/api/reviews/create-review/${tutorId}`,
        feedback,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 201) {
        setReviews((prevReviews) => [...prevReviews, response.data.review]);
        toast.success("Feedback Submited", {
          style: { background: "rgb(57, 57, 57)", color: "white" },
        });
        setFeedBack({
          title: "",
          content: "",
          rating: 0,
        });
      }
    } catch (error) {
      setError(error);
    }
  };

  // Stimulate tutor accepting the request
  useEffect(() => {
    const stimulateTutorApproval = () => {
      // Simulate a delay for the tutor to approve the request
      setTimeout(() => {
        setRequestApproved(true);
      }, 5000); // stimulate a 5-second delay
    };

    if (requestSent && !requestApproved) {
      stimulateTutorApproval();
    }
  }, [requestSent, requestApproved]);

  if (loading)
    return (
      <div>
        <Loader />
      </div>
    );

  if (error) return <div>Error loading tutor data</div>;
  console.log(error);
  return (
    <div className="tutor-detail-page">
      <div className="left-section">
        <div className="profile-image">
          <img
            src={
              tutorData.profileImage
                ? tutorData.profileImage
                : `https://api.dicebear.com/9.x/initials/svg?seed=${tutorData.name}&backgroundColor=00897b,00acc1,039be5,1e88e5,3949ab,43a047,5e35b1,7cb342,8e24aa,c0ca33,d81b60,e53935,f4511e,fb8c00,fdd835,ffb300,c0aede`
            }
            alt="Tutor"
          />
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
            className={`add-request-btn ${
              requestApproved
                ? "request-approved"
                : requestSent
                ? "request-sent"
                : ""
            }`}
            onClick={handleRequestClick}
            disabled={requestSent || requestApproved}
          >
            {requestApproved ? "Added" : requestSent ? "Request Sent" : "Add"}
          </button>
        </div>
        <div className="feedback-comments glass-effect">
          <h2>Reviews</h2>
          {reviews.length > 0 ? (
            reviews.map((review) => (
              <div className="comment" key={review.id}>
                <p>
                  <strong>{review.studentId.name}:</strong> {review.content}
                </p>
                <div className="stars">
                  {"★".repeat(review.rating)}
                  {"☆".repeat(5 - review.rating)}
                </div>
              </div>
            ))
          ) : (
            <p>No reviews yet</p>
          )}
        </div>
      </div>
      <div className="right-section">
        <div className="availability-card glass-effect">
          <h2>Availability</h2>
          {slots.length > 0 ? (
            slots.map((slot) => (
              <div key={slot._id}>
                <p>Time {slot.duration} min</p>
                <p>Date: {convertToStandardDate(slot.date)}</p>
                <p>Start Time: {slot.startTime}</p>
                <p>End Time: {slot.endTime}</p>
                <p>Price: {slot.price}</p>
              </div>
            ))
          ) : (
            <p>No slots created</p>
          )}
          <button
            className="btn"
            style={{ margin: "auto", marginTop: "12px", cursor: "pointer" }}
          >
            Book Demo
          </button>
        </div>
        <div className="feedback-form glass-effect">
          <h2>Submit Feedback</h2>
          <form onSubmit={handleFeedbackSubmit}>
            <div className="form-group">
              <label htmlFor="feedback-name">Name</label>
              <input
                type="text"
                id="feedback-name"
                name="title"
                value={feedback.title}
                onChange={handleFeedbackChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="feedback-comment">Comment</label>
              <textarea
                id="feedback-comment"
                name="content"
                value={feedback.content}
                onChange={handleFeedbackChange}
                required
              ></textarea>
            </div>
            <div className="form-group">
              <label htmlFor="feedback-rating">Rating</label>
              <select
                id="feedback-rating"
                name="rating"
                value={feedback.rating}
                onChange={handleFeedbackChange}
                required
              >
                <option value="0">Select Rating</option>
                <option value="1">1 - Poor</option>
                <option value="2">2 - Fair</option>
                <option value="3">3 - Good</option>
                <option value="4">4 - Very Good</option>
                <option value="5">5 - Excellent</option>
              </select>
            </div>
            <button
              type="submit"
              className="btn"
              style={{ margin: "auto", marginTop: "12px", cursor: "pointer" }}
            >
              Submit Feedback
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Tutor;
