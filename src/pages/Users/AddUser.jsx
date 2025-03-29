import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SideBar from "../../components/SideBar";
import Header from "../../components/Header";
import Breadcrumbs from "../../components/Breadcrumbs";
import Footer from "../../components/Footer";

function AddUser() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [alert, setAlert] = useState({ type: "", message: "" });
  const [submit, setSubmit] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // useEffect(() => {
  //   const token = localStorage.getItem("token");

  //   if (!token) {
  //     console.error("No token found. Redirecting to login...");
  //     setTimeout(() => navigate("/login", { replace: true }), 0);
  //   }
  // }, [navigate]);

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

                      <form>
                        <div className="row">
                          <div className="mb-3 col-md-6">
                            <label htmlFor="name" className="form-label">
                              Name
                            </label>
                            <input className="form-control" id="name" />
                          </div>
                          <div className="mb-3 col-md-6">
                            <label htmlFor="mobile" className="form-label">
                              Mobile
                            </label>
                            <input className="form-control" id="mobile" />
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
                            <label htmlFor="password" className="form-label">
                              Password
                            </label>
                            <div className="input-group">
                              <input
                                type={showPassword ? "text" : "password"}
                                className="form-control"
                                id="password"
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
