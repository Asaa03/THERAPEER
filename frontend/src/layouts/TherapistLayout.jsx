import React from "react"
import Navbar from "../components/therapist/Navbar.jsx"
import Sidebar from "../components/therapist/Sidebar.jsx"
import { Outlet } from "react-router-dom"

const TherapistLayout = () => {
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

export default TherapistLayout
