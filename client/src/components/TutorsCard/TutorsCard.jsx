/* eslint-disable react/prop-types */

import { Link } from "react-router-dom"

const TutorsCard = ({image, name, subject}) => {
  return (
    <article className="tutor">
      <div className="tutor_image">
        <img src={image} alt={`${name}`} />
      </div>
      <div className="tutor_info">
        <h4>{name}</h4>
        <small>{subject}</small>
        <Link to="/tutor/1"><button className="explore_btn">Explore More</button></Link>
      </div>
    </article>
  )
}

export default TutorsCard