import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "admin-lte/dist/css/adminlte.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "admin-lte/dist/js/adminlte.min.js";
import "bootstrap-icons/font/bootstrap-icons.css";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
  
    setLoading(true);
    setError("");
  
    const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
  
    console.log("Username:", username);
    console.log("Password:", password);
  
    try {
      const response = await axios.post(`${apiBaseUrl}/auth/login`, {
        username,
        password,
      });
  
      console.log("API Response:", response.data);
  
      if (!response.data || !response.data.token) {
        throw new Error("Invalid API response");
      }
  
      localStorage.setItem("username", response.data.username);
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("role", response.data.userRole);
      navigate("/dashboard");
    } catch (err) {
      console.error("Login Error:", err);
  
      let errorMessage = "An error occurred. Please try again.";
  
      if (err.response) {
        console.log("Error Response Data:", err.response.data);
        errorMessage = err.response.data?.message || errorMessage;
      }
  
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="d-flex container justify-content-center align-items-center min-vh-100">
      <div
        className="card p-4 shadow-lg"
        style={{ minWidth: "350px", maxWidth: "400px" }}
      >
        <h2 className="text-center">Login</h2>
        {error && <div className="alert alert-danger">{error}</div>}
        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label className="form-label">Username</label>
            <input
              type="email"
              className="form-control"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              disabled={loading}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={loading}
            />
          </div>
          <button
            type="submit"
            className="btn btn-primary w-100"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
