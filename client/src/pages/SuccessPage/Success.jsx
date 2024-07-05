import { useEffect } from "react";
import { Link } from "react-router-dom";
import "./success.css";
const createGlitters = (count) => {
  const glitters = [];
  for (let i = 0; i < count; i++) {
    const left = Math.random() * 100 + "%";
    const top = Math.random() * 100 + "%";
    const delay = Math.random() * 2 + "s";
    const size = Math.random() * 5 + 2 + "px";
    glitters.push(
      <div
        key={i}
        className="glitter"
        style={{ left, top, animationDelay: delay, width: size, height: size }}
      />
    );
  }
  return glitters;
};
const Success = () => {
  useEffect(() => {
    document.body.classList.add("celebration"); // Add celebration class to body
    return () => {
      document.body.classList.remove("celebration"); // Clean up on unmount
    };
  }, []);

  return (
    <div className="container glitter-container">
      {createGlitters(50)} {/* Adjust the number of glitters as needed */}
      <section>
        <h2>Payment Successful</h2>
        <p style={{display: "flex", justifyContent: "center"}}>Your payment was successful. Thank you for your booking!</p>
        <Link
          to="/"
          className="btn btn-primary"
          style={{ height: "56px", margin: "auto", fontSize: "12px" }}
        >
          Back to Home
        </Link>
      </section>
    </div>
  );
};

export default Success;
