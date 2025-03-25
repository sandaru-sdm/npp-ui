import React from 'react'
import Header from '../components/Header';
import SideBar from '../components/SideBar';

function Dashboard() {
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