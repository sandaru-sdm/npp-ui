import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import Avatar from "../assets/Avatar-1.png";
import Logo from "../assets/Compass-logo.png";
import axios from "axios";

function SideBar() {
  const userRole = localStorage.getItem("role");
  const username = localStorage.getItem("username");
  const token = localStorage.getItem("token");

  const [name, setName] = useState("");
  
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(`${apiBaseUrl}/auth/${username}`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        console.log("API Response:", response.data);
        setName(response.data.name);
      } catch (error) {
        console.error("Error:", error);
      }
    }
    fetchData();
  });

  return (
    <div>
      <div
        className="d-flex flex-column flex-shrink-0 p-3 bg-light"
        style={{ width: "280px", height: "100vh" }}
      >
        <NavLink
          to="/dashboard"
          className="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-dark text-decoration-none"
        >
          <img
            src={Logo}
            alt="Logo"
            width="32"
            height="32"
            className="rounded-circle me-2"
          />
          <span className="fs-4">NPP</span>
        </NavLink>
        <hr />
        <ul className="nav nav-pills flex-column mb-auto">
          <li className="nav-item">
            <NavLink
              className="nav-link text-decoration-none link-dark"
              to="/dashboard"
              style={({ isActive }) => ({
                color: isActive ? "black" : "",
              })}
            >
              <i className="bi bi-speedometer me-2"></i> Dashboard
            </NavLink>
          </li>
          {userRole === "ADMIN" && (
            <li className="nav-item">
              <NavLink
                className="nav-link text-decoration-none link-dark"
                to="/users"
                style={({ isActive }) => ({
                  color: isActive ? "blue" : "",
                })}
              >
                <i className="bi bi-person-circle me-2"></i> Users
              </NavLink>
            </li>
          )}

          <li className="nav-item">
            <NavLink
              className="nav-link text-decoration-none link-dark"
              to="/villagers"
              style={({ isActive }) => ({
                color: isActive ? "black" : "",
              })}
            >
              <i className="bi bi-people-fill me-2"></i> Villagers
            </NavLink>
          </li>
        </ul>
        <hr />
        <div className="dropdown">
          <a
            href="#"
            className="d-flex align-items-center link-dark text-decoration-none dropdown-toggle"
            id="dropdownUser2"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <img
              src={Avatar}
              alt="Profile"
              width="32"
              height="32"
              className="rounded-circle me-2"
            />
            <strong>{name}</strong>
          </a>
          <ul
            className="dropdown-menu text-small shadow"
            aria-labelledby="dropdownUser2"
          >
            <li>
              <NavLink className="dropdown-item" to="/profile">
                Profile
              </NavLink>
            </li>
            <li>
              <hr className="dropdown-divider" />
            </li>
            <li>
              <button
                className="dropdown-item"
                onClick={() => {
                  localStorage.removeItem("token");
                  localStorage.removeItem("role");
                  localStorage.removeItem("username");
                  window.location.href = "/login";
                }}
              >
                Sign out
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default SideBar;
