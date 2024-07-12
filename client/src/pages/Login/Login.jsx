import "./login.css";
import illustration from "../../assets/loginPage.png";
import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../../components/Context/AuthContext";
import { toast } from "react-toastify";
const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { login, error, loading } = useContext(AuthContext);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(formData);
    if (error) {
      toast.error(error, {
        style: { background: "rgba(247, 88, 66, 0.4)", color: "white" },
      });
    } else {
      toast.success("Login Success!", {
        style: { background: "rgb(57, 57, 57)", color: "white" },
      });
    }
  };
  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-form">
          <h2>Welcome Back!</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input type="email" id="email" name="email" value={formData.email} onChange={handleInputChange} />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input type="password" id="password" name="password" value={formData.password} onChange={handleInputChange} />
            </div>
            <button type="submit">
            {loading ? "Logging In..." : "Login In"}
            </button>
          </form>
          <p style={{ marginTop: "10px" }}>
            Don&apos;t have an account?{" "}
            <Link to="/signup">
              <span style={{ color: "var(--color-danger)" }}>Sign Up</span>
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
