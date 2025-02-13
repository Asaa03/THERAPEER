import React from "react"
import Navbar from "../components/Navbar.jsx"
import { Outlet } from "react-router-dom"

const UserLayout = () => {
  return (
    <div className="bg-[#f8f9fd]">
      <Navbar />
        <Outlet  />
    </div>
  )
}

export default UserLayout
