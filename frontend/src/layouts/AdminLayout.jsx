import React from "react"
import Navbar from "../components/admin/Navbar.jsx"
import Sidebar from "../components/admin/Sidebar.jsx"
import { Outlet } from "react-router-dom"

const AdminLayout = () => {
  return (
    <div className="bg-[#F8F9FD]">
      <Navbar />
      <div className="flex">
        <Sidebar />
        <div className="flex-1 p-6">
          <Outlet /> 
        </div>
      </div>
    </div>
  )
}

export default AdminLayout
