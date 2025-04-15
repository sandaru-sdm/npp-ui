import React, { useEffect } from "react";
import Header from "../components/Header";
import SideBar from "../components/SideBar";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      if (!token) {
        console.error("No token found. Redirecting to login...");
        setTimeout(() => navigate("/login", { replace: true }), 0);
        return;
      }

      try {
        const response1 = await axios.get(`${apiBaseUrl}/villagers/north`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        const response2 = await axios.get(`${apiBaseUrl}/villagers/east`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        const response3 = await axios.get(`${apiBaseUrl}/villagers/south`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        const response4 = await axios.get(`${apiBaseUrl}/villagers/west`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        console.log(response1);
        console.log(response2);
        console.log(response3);
        console.log(response4);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    }

    fetchData();
  }, [token]);

  return (
    <div className="d-flex bg-gradient">
      <SideBar />
      <div className="flex-grow-1">
        <Header />
        {/* content  */}
      </div>
    </div>
  );
}

export default Dashboard;
