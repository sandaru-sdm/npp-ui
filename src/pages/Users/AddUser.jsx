import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SideBar from "../../components/SideBar";
import Header from "../../components/Header";
import Breadcrumbs from "../../components/Breadcrumbs";

function AddUser() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("");
  const [alert, setAlert] = useState({ type: "", message: "" });
  const [submit, setSubmit] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      console.error("No token found. Redirecting to login...");
      setTimeout(() => navigate("/login", { replace: true }), 0);
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(password !== confirmPassword) {
      console.log("Password and Consirm passwords are not matching");
      setAlert({ type: "danger", message: "Passwords do not match" });
      return;
    }
    setSubmit(true);
    
    const token = localStorage.getItem("token");
    const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
    const adminUsername = localStorage.getItem("username");

    try {
      const response = await axios.put(
        `${apiBaseUrl}/auth/register`,
        { adminUsername, name, username, password, mobileNumber, role },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      setAlert({
        type: "success",
        message: response.data.message || "User Saved successfully!",
      });

      setTimeout(() => {
        navigate("/users");
      }, 2000);
    } catch (error) {
      setAlert({
        type: "danger",
        message: error.response?.data?.message || "Failed to save user.",
      });
    }
  };

  return (
    <div className="d-flex">
      <SideBar />
      <div className="flex-grow-1 d-flex flex-column min-vh-100">
        <Header />
        <div className="ms-sm-auto col-lg-12 px-md-4 flex-grow-1">
          <Breadcrumbs
            title="Add User"
            breadcrumbs={[
              { label: "Home", path: "/dashboard" },
              { label: "Users", path: "/users" },
              { label: "Add User", path: location.pathname, active: true },
            ]}
          />
          <div className="d-flex justify-content-center align-content-center flex-grow-1">
            <div className="col-md-12 col-lg-12 px-md-4">
              <div className="container mt-2 d-flex justify-content-center">
                <div className="col-md-12">
                  <div className="card card-primary card-outline">
                    <div className="d-flex card-header align-items-center justify-content-center">
                      <h4 className="card-title fw-bold">Add User</h4>
                    </div>
                    <div className="card-body">
                      {alert.message && (
                        <div
                          className={`alert alert-${alert.type}`}
                          role="alert"
                        >
                          {alert.message}
                        </div>
                      )}

                      <form onSubmit={handleSubmit}>
                        <div className="row">
                          <div className="mb-3 col-md-6">
                            <label htmlFor="name" className="form-label">
                              Name
                            </label>
                            <input
                              className="form-control"
                              id="name"
                              value={name}
                              onChange={(e) => setName(e.target.value)}
                              required
                            />
                          </div>
                          <div className="mb-3 col-md-6">
                            <label htmlFor="mobile" className="form-label">
                              Mobile
                            </label>
                            <input
                              className="form-control"
                              id="mobile"
                              value={mobileNumber}
                              onChange={(e) => setMobileNumber(e.target.value)}
                              required
                            />
                          </div>
                        </div>

                        <div className="row">
                          <div className="mb-3 col-md-6">
                            <label htmlFor="role" className="form-label">
                              Role
                            </label>
                            <select
                              className="form-control"
                              id="role"
                              value={role}
                              onChange={(e) => setRole(e.target.value)}
                              required
                            >
                              <option value="USER">User</option>
                              <option value="ADMIN">Admin</option>
                            </select>
                          </div>
                          <div className="mb-3 col-md-6">
                            <label htmlFor="email" className="form-label">
                              Username
                            </label>
                            <input
                              type="email"
                              className="form-control"
                              id="email"
                              value={username}
                              onChange={(e) => setUsername(e.target.value)}
                              required
                            />
                          </div>
                        </div>

                        <div className="row">
                          <div className="mb-3 position-relative col-md-6">
                            <label htmlFor="password" className="form-label">
                              Password
                            </label>
                            <div className="input-group">
                              <input
                                type={showPassword ? "text" : "password"}
                                className="form-control"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                              />
                              <button
                                type="button"
                                className="btn btn-outline-secondary"
                                onClick={() => setShowPassword(!showPassword)}
                              >
                                <i
                                  className={`bi ${
                                    showPassword ? "bi-eye-slash" : "bi-eye"
                                  }`}
                                ></i>
                              </button>
                            </div>
                          </div>
                          <div className="mb-3 position-relative col-md-6">
                            <label
                              htmlFor="confirmPassword"
                              className="form-label"
                            >
                              Confirm Password
                            </label>
                            <div className="input-group">
                              <input
                                type={showPassword ? "text" : "password"}
                                className="form-control"
                                id="confirmPassword"
                                value={confirmPassword}
                                onChange={(e) =>
                                  setConfirmPassword(e.target.value)
                                }
                                required
                              />
                              <button
                                type="button"
                                className="btn btn-outline-secondary"
                                onClick={() => setShowPassword(!showPassword)}
                              >
                                <i
                                  className={`bi ${
                                    showPassword ? "bi-eye-slash" : "bi-eye"
                                  }`}
                                ></i>
                              </button>
                            </div>
                          </div>
                        </div>

                        <div className="card-footer d-flex justify-content-center mt-2">
                          <button
                            type="submit"
                            className="btn btn-primary col-sm-12 mt-3 col-md-6"
                            disabled={submit}
                          >
                            Submit
                          </button>

                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddUser;
