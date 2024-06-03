import { Link } from "react-router-dom";
import "./404.css";
import notFound_img from "../../assets/courses/notfound.jpg"
const NotFound_404 = () => {
  return (
    <div className="not-found">
      <div className="not-found-content">
        <h1>404</h1>
        <h2>Oops! Page Not Found</h2>
        <p>We can&apos;t seem to find the page you&apos;re looking for.</p>
        <Link to="/" className="btn">
          Go to Home
        </Link>
      </div>
      <div className="not-found-illustration">
        <img src={notFound_img} alt="404 Illustration" />
      </div>
    </div>
  );
};

export default NotFound_404;
