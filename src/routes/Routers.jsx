import { Route, Routes } from "react-router-dom"
import Home from "../pages/Home/Home"
import Tutors from "../pages/Tutors/Tutors"
const Routers = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/home" element={<Home />} />
      <Route path="/tutors" element={<Tutors />} />
    </Routes>
  )
}

export default Routers