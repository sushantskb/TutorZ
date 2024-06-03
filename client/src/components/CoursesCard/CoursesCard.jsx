/* eslint-disable react/prop-types */

const CoursesCard = ({title, image, description}) => {
  return (
    <article className="course" style={{borderRadius: "30px"}}>
      <div className="course_image">
        <img src={image} alt="course_image" style={{borderRadius: "30px"}} />
      </div>
      <div className="course_info">
        <h4>{title}</h4>
        <p>
          {description}
        </p>
        <a href="courses.html" className="btn btn-primary">
          Learn More
        </a>
      </div>
    </article>
  );
};

export default CoursesCard;
