import React, { useEffect, useState } from "react";
import axios from "axios";
import DataTable from "react-data-table-component";

function UsersTable() {
  const token = localStorage.getItem("token");
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
  const [users, setUsers] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);

  useEffect(() => {
    async function fetchData() {
      if (!token) {
        console.error("No token found. Redirecting to login...");
        setTimeout(() => navigate("/login", { replace: true }), 0);
        return;
      }

      try {
        const response = await axios.get(`${apiBaseUrl}/auth/users`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        setUsers(response.data);
        setFilteredUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    }

    fetchData();
  }, [token]);

  useEffect(() => {
    const filteredData = users.filter(
      (user) =>
        user.name.toLowerCase().includes(searchText.toLowerCase()) ||
        user.username.toLowerCase().includes(searchText.toLowerCase()) ||
        user.mobileNumber.includes(searchText) ||
        user.role.toLowerCase().includes(searchText.toLowerCase())
    );
    setFilteredUsers(filteredData);
  }, [searchText, users]);

  const columns = [
    {
      name: "#",
      selector: (row, index) => index + 1,
      width: "50px",
    },
    {
      name: "Name",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "Username",
      selector: (row) => row.username,
      sortable: true,
    },
    {
      name: "Mobile Number",
      selector: (row) => row.mobileNumber,
      width: "150px",
    },
    {
      name: "Role",
      selector: (row) => row.role,
      sortable: true,
      width: "80px",
    },
    {
      name: "Activated",
      selector: (row) => (row.isActive ? "Yes" : "No"),
      sortable: true,
      width: "100px",
    },
    {
      name: "Actions",
      cell: (row) => (
        <div className="d-flex gap-2 justify-content-center align-items-center">
          <button className="btn btn-primary btn-sm">Update</button>
          <button
            className={`btn btn-sm ${
              row.isActive ? "btn-danger" : "btn-success"
            }`}
          >
            {row.isActive ? "Deactivate" : "Activate"}
          </button>
        </div>
      ),
      width: "170px",
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
  ];

  return (
    <div className="container mt-3">
      <div className="row d-flex align-items-center mb-3">
        <div className="col-md-8">
          <h2 className="mb-0">Users List</h2>
        </div>
        <div className="col-md-4 text-end">
          <input
            type="text"
            placeholder="Search users..."
            className="form-control justify-content-end"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            style={{ maxWidth: "300px" }}
          />
        </div>
      </div>

      <DataTable
        columns={columns}
        data={filteredUsers}
        pagination
        highlightOnHover
        striped
      />
    </div>
  );
}

export default UsersTable;
