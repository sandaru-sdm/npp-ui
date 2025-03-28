import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SideBar from "../../components/SideBar";
import Header from "../../components/Header";
import Breadcrumbs from "../../components/Breadcrumbs";
import Footer from "../../components/Footer";

function AddUser() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      console.error("No token found. Redirecting to login...");
      setTimeout(() => navigate("/login", { replace: true }), 0);
    }
  }, [navigate]);

  return (
    <div className="d-flex">
      <SideBar />
      <div className="flex-grow-1">
        <Header />

        <div className="ms-sm-auto col-lg-12 px-md-4 bg-gradient">
          <Breadcrumbs
            title="Add User"
            breadcrumbs={[
              { label: "Home", path: "/dashboard" },
              { label: "Users", path: "/users" },
              { label: "Add User", path: location.pathname, active: true },
            ]}
          />

          <div className="d-flex justify-content-center align-content-center">
            <div className="col-md-9 col-lg-10 px-md-4">
              <div className="container mt-2 d-flex justify-content-center">
                <div className="col-md-6">
                  <div className="card card-primary card-outline">
                    <div className="d-flex card-header align-items-center justify-content-center">
                      <h4 className="card-title fw-bold">Add User</h4>
                    </div>
                    <div className="card-body">
                      {/* {alert.message && (
                        <div
                          className={`alert alert-${alert.type}`}
                          role="alert"
                        >
                          {alert.message}
                        </div>
                      )} */}

                      <form>
                        <div className="mb-3">
                          <label htmlFor="name" className="form-label">
                            Name
                          </label>
                          <input className="form-control" id="name" />
                        </div>

                        <div className="mb-3">
                          <label htmlFor="email" className="form-label">
                            Email
                          </label>
                          <input
                            type="email"
                            className="form-control"
                            id="email"
                          />
                        </div>

                        <div className="mb-3 position-relative">
                          <label htmlFor="password" className="form-label">
                            Password
                          </label>
                          <div className="input-group">
                            {/* <input
                              type={showPassword ? "text" : "password"}
                              className="form-control"
                              id="password"
                              
                            /> */}
                            {/* <button
                              type="button"
                              className="btn btn-outline-secondary"
                              onClick={() => setShowPassword(!showPassword)}
                            >
                              <i
                                className={`bi ${
                                  showPassword ? "bi-eye-slash" : "bi-eye"
                                }`}
                              ></i>
                            </button> */}
                          </div>
                        </div>

                        {/* <div className="mb-3">
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
                        </div> */}

                        <div className="card-footer d-flex justify-content-center mt-2">
                          <button
                            type="submit"
                            className="btn btn-primary col-sm-12 mt-3"
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
          <Footer />
        </div>
      </div>
    </div>
  );
}

export default AddUser;
