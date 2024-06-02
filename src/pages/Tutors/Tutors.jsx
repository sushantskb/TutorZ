import TutorsCard from "../../components/TutorsCard/TutorsCard";
import { tutorsData } from "../../data/tutorData";
import "./tutors.css";
const Tutors = () => {
  return (
    <section className="tutors">
      <h2>Our Tutors</h2>
      <div className="container tutors_container">
        {tutorsData.map((tutor) => (
          <TutorsCard key={tutor.id} name={tutor.name} subject={tutor.subject} image={tutor.image} />
        ))}
      </div>
    </section>
  );
};

export default Tutors;
