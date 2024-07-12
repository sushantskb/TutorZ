import { Link } from 'react-router-dom';

const Error = () => {
  return (
    <div className="container">
      <section>
        <h2>Payment Cancelled</h2>
        <p style={{display: "flex", justifyContent: "center"}}>Your payment was cancelled. Please try again later.</p>
        <Link to="/" className="btn btn-primary" style={{ height: "56px", margin: "auto", fontSize: "12px" }}>Back to Home</Link>
      </section>
    </div>
  );

}

export default Error