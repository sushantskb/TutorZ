import "./login.css";
import illustration from "../../assets/loginPage.png";
import { Link } from "react-router-dom";
const Login = () => {
  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-form">
          <h2>Welcome Back!</h2>
          <form>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input type="email" id="email" name="email" />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input type="password" id="password" name="password" />
            </div>
            <button type="submit">Login</button>
          </form>
          <p style={{ marginTop: "10px" }}>
            Don&apos;t have an account?{" "}
            <Link to="/signup">
              <span style={{color: "var(--color-danger)"}}>Sign Up</span>
            </Link>
          </p>
        </div>
        <div className="decorative-illustration">
          <img src={illustration} alt="Illustration" />
        </div>
      </div>
    </div>
  );
};

export default Login;
