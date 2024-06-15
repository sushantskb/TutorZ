/* eslint-disable react/prop-types */

const TutorsCard = ({image, name, subject}) => {
  return (
    <article className="tutor">
      <div className="tutor_image">
        <img src={image} alt={`${name}`} />
      </div>
      <div className="tutor_info">
        <h4>{name}</h4>
        <small>{subject}</small>
        <button className="explore_btn">Explore More</button>
      </div>
    </article>
  )
}

export default TutorsCard