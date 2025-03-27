import React from "react";
import { NavLink } from "react-router-dom";

function Header() {
  return (
    <div>
      <header
        className="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3 mb-4 border-bottom"
        style={{ backgroundColor: "#800040" }}
      >
        <ul className="nav col-12 col-md-auto mb-2 justify-content-center mb-md-0">
          <li>
            <NavLink
              to="/dashboard"
              className={({ isActive }) =>
                `nav-link px-2 ${
                  isActive ? "active text-white" : "link-dark fw-bolder"
                }`
              }
            >
              Dashboard
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/users"
              className={({ isActive }) =>
                `nav-link px-2 ${
                  isActive ? "active text-white" : "link-dark fw-bolder"
                }`
              }
            >
              Users
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/villagers"
              className={({ isActive }) =>
                `nav-link px-2 ${
                  isActive ? "active text-white" : "link-dark fw-bolder"
                }`
              }
            >
              Villagers
            </NavLink>
          </li>
        </ul>

        <div className="col-md-3 text-end">
          <button
            className="btn btn-outline-light me-2"
            onClick={() => {
              localStorage.removeItem("token");
              localStorage.removeItem("role");
              localStorage.removeItem("username");
              window.location.href = "/login";
            }}
          >
            <i className="bi bi-box-arrow-left me-2"></i>
            Sign out
          </button>
        </div>
      </header>
    </div>
  );
}

export default Header;
