/* eslint-disable react/prop-types */
import { useState } from "react";

const FaqsCard = ({question, answer}) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(!open);
  };
  return (
    <article className={`faq ${open ? "open" : ""}`}  onClick={handleOpen}>
      <div className="faq_icon">
        <i className={`uil ${open ? "uil-minus" : "uil-plus"}`}></i>
      </div>
      <div className="question_answer">
        <h4>{question}</h4>
        <p>
          {answer}
        </p>
      </div>
    </article>
  );
};

export default FaqsCard;
