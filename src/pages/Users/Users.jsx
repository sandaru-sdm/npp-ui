import React, { useEffect } from "react";
import SideBar from "../../components/SideBar";
import Header from "../../components/Header";
import { useNavigate } from "react-router-dom";
import Breadcrumbs from "../../components/Breadcrumbs";
import UsersTable from "./UsersTable";
import Footer from "../../components/Footer";

function Users() {
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
            title="Users"
            breadcrumbs={[
              { label: "Home", path: "/dashboard" },
              { label: "Users", path: location.pathname, active: true },
            ]}
          />

          <div className="d-flex justify-content-center align-content-center">
            <a href="/add-user" className="btn btn-success col-4 mb-5">
              Add User
            </a>
          </div>

          <UsersTable/>

        </div>
        <Footer/>
      </div>
    </div>
  );
}

export default Users;
