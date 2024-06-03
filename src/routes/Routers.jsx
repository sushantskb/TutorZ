import { Route, Routes } from "react-router-dom"
import Home from "../pages/Home/Home"
import Tutors from "../pages/Tutors/Tutors"
import NotFound_404 from "../pages/NotFound/NotFound_404"
import StudentProfile from "../pages/Profiles/StudentProfile/StudentProfile"
import TutorProfile from "../pages/Profiles/TutorProfile/TutorProfile"
import Courses from "../pages/Courses/Courses"
import Tutor from "../pages/Tutor/Tutor"
import Login from "../pages/Login/Login"

const Routers = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/home" element={<Home />} />
      <Route path="/courses" element={<Courses />} />
      <Route path="/tutors" element={<Tutors />} />
      <Route path="/tutor/:id" element={<Tutor />} />
      <Route path="/student" element={<StudentProfile />} />
      <Route path="/tutor" element={<TutorProfile />} />
      <Route path="/login" element={<Login />} />
      <Route path="/*" element={<NotFound_404 />} />
    </Routes>
  )
}

export default Routers