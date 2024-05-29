import { Route, Routes } from "react-router-dom"
import Home from "../pages/Home/Home"
const Routers = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/home" element={<Home />} />
    </Routes>
  )
}

export default Routers