import { useContext, useEffect, useState } from "react";
import TutorsCard from "../../components/TutorsCard/TutorsCard";
// import { tutorsData } from "../../data/tutorData";
import "./tutors.css";
import { AuthContext } from "../../components/Context/AuthContext";
import axios from "axios";
const Tutors = () => {
  const { token } = useContext(AuthContext);
  const [tutors, setTutors] = useState([]);
  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/users", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setTutors(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  console.log("Response", tutors);

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="tutors">
      <h2>Our Tutors</h2>
      <div className="container tutors_container">
        {tutors
          .filter((item) => item.role !== "student")
          .map((tutor) => (
            <TutorsCard
              id={tutor._id}
              key={tutor.id}
              name={tutor.name}
              subject={tutor.subject}
              image={tutor.image}
            />
          ))}
      </div>
    </div>
  );
};

export default Tutors;
