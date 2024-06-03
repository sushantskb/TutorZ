import CoursesCard from "../../components/CoursesCard/CoursesCard"
import { courseData } from "../../data/courses"

const Courses = () => {
  return (
    <div>
        <h2>Courses we offer</h2>
        <div className="container courses_container">
          {courseData.map((course) => (
            <CoursesCard
              key={course.id}
              title={course.title}
              image={course.image}
              description={course.description}
            />
          ))}
        </div>
      </div>
  )
}

export default Courses