import { Route, Routes } from "react-router-dom"
import Home from "../pages/Home/Home"
import Tutors from "../pages/Tutors/Tutors"
import NotFound_404 from "../pages/NotFound/NotFound_404"

const Routers = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/home" element={<Home />} />
      <Route path="/tutors" element={<Tutors />} />
      <Route path="/*" element={<NotFound_404 />} />
    </Routes>
  )
}

export default Routers