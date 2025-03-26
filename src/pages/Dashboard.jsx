import React, { useEffect } from 'react'
import Header from '../components/Header';
import SideBar from '../components/SideBar';
import { useNavigate } from 'react-router-dom';

function Dashboard() {

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
  
    if (!token) {
      console.error("No token found. Redirecting to login...");
      setTimeout(() => navigate("/login", { replace: true }), 0);
    }
  }, [navigate]);  

  return (
    <div className='d-flex bg-gradient'>
      <SideBar />
      <div className='flex-grow-1'>
        <Header />
        {/* content  */}
      </div>
    </div>
  )
}

export default Dashboard;