// src/components/Login.js
import "./login.css";
import illustration from "../../assets/loginPage.png";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login, clearError } from "../../hooks/slices/authSlice";
import { toast } from "react-toastify";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const { user, isLoading, error } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  console.log(user);
  useEffect(() => {
    dispatch(clearError());
  }, [dispatch]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(login(formData));
    } catch (error) {
      console.log("Login error: ", error);
    }
  };

  useEffect(() => {
    if (user) {
      toast.success("Login Success", {
        style: { background: "rgb(57, 57, 57)", color: "white" },
      });
      navigate("/");
    }
  }, [user, navigate]);

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-form">
          <h2>Welcome Back!</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
              />
            </div>
            <button type="submit">Login</button>
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
