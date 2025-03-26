import React, { useEffect } from 'react'
import SideBar from '../components/SideBar';
import Header from '../components/Header';
import { useNavigate } from 'react-router-dom';

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
      <div className='d-flex bg-gradient'>
        <SideBar />
        <div className='flex-grow-1'>
          <Header />
          {/* content  */}
        </div>
      </div>
    )
}

export default Users