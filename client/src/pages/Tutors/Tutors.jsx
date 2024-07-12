import { useContext, useEffect, useState } from "react";
import TutorsCard from "../../components/TutorsCard/TutorsCard";
// import { tutorsData } from "../../data/tutorData";
import "./tutors.css";
import { AuthContext } from "../../components/Context/AuthContext";
import axios from "axios";
import Loader from "../../components/Loader/Loader";
const Tutors = () => {
  const { token } = useContext(AuthContext);
  const [loading, setLoading] = useState(true)
  const [tutors, setTutors] = useState([]);
  const fetchData = async () => {
    try {
      const response = await axios.get("/api/users", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setTutors(response.data);
      setLoading(false)
    } catch (error) {
      console.log(error);
      setLoading(false)
    }
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);
  if (loading) return <Loader />
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
              image={tutor.profileImage ? tutor.profileImage : `https://api.dicebear.com/9.x/initials/svg?seed=${tutor.name}&backgroundColor=00897b,00acc1,039be5,1e88e5,3949ab,43a047,5e35b1,7cb342,8e24aa,c0ca33,d81b60,e53935,f4511e,fb8c00,fdd835,ffb300,c0aede`}
            />
          ))}
      </div>
    </div>
  );
};

export default Tutors;
