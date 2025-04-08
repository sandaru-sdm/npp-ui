import React, { useEffect, useState } from "react";
import axios from "axios";
import DataTable from "react-data-table-component";
import { useNavigate } from "react-router-dom";

function VillagersTable() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
  const [villagers, setVillagers] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [filteredVillagers, setFilteredVillagers] = useState([]);

  useEffect(() => {
    async function fetchData() {
      if (!token) {
        console.error("No token found. Redirecting to login...");
        navigate("/login", { replace: true });
        return;
      }

      try {
        const response = await axios.get(`${apiBaseUrl}/villagers`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        console.log("Fetched villagers:", response.data);
        setVillagers(response.data);
        setFilteredVillagers(response.data);
      } catch (error) {
        console.error("Error fetching villagers:", error);
      }
    }

    fetchData();
  }, [token, apiBaseUrl, navigate]);

  useEffect(() => {
    const filteredData = villagers.filter((villager) => {
      return (
        villager.name.toLowerCase().includes(searchText.toLowerCase()) ||
        villager.gender.toLowerCase().includes(searchText.toLowerCase()) ||
        (villager.address &&
          `${villager.address.number} ${villager.address.line1} ${villager.address.line2} ${villager.address.division}`
            .toLowerCase()
            .includes(searchText.toLowerCase()))
      );
    });
    setFilteredVillagers(filteredData);
  }, [searchText, villagers]);

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
      width: "350px",
    },
    {
      name: "Gender",
      selector: (row) => row.gender,
      sortable: true,
      width: "100px",
    },
    {
      name: "Address",
      selector: (row) =>
        row.address
          ? `${row.address.number}, ${row.address.line1}, ${row.address.line2}, ${row.address.division}`
          : "N/A",
      width: "400px",
    },
    {
      name: "Actions",
      cell: (row) => (
        <a href={`/update-villager/${row.id}`} className="d-flex gap-2 justify-content-center align-items-center">
          <button className="btn btn-primary btn-sm">Update</button>
        </a>
      ),
      width: "100px",
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
  ];

  return (
    <div className="container mt-3">
      <div className="row d-flex align-items-center mb-3">
        <div className="col-md-8">
          <h2 className="mb-0">Villagers List</h2>
        </div>
        <div className="col-md-4 text-end">
          <input
            type="text"
            placeholder="Search villagers..."
            className="form-control justify-content-end"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            style={{ maxWidth: "300px" }}
          />
        </div>
      </div>

      <DataTable
        columns={columns}
        data={filteredVillagers}
        pagination
        highlightOnHover
        striped
      />
    </div>
  );
}

export default VillagersTable;