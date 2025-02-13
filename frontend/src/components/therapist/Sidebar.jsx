import React, { useContext } from 'react'
import { NavLink } from 'react-router-dom'
import { TherapistContext } from '../../context/TherapistContext'

const Sidebar = () => {
    const {tToken } = useContext(TherapistContext)
    return (
        <div className='min-h-screen bg-white border-r'>
            {
                tToken && <ul className='text-[#515151] mt-5'>
                    <NavLink className={({ isActive }) => `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-60 cursor-pointer ${isActive ? 'bg-[#F2F3FF] border-r-4 border-primary' : ''}`} to={'/therapist/therapist-dashboard'}>
                        <p>Dashboard</p>
                    </NavLink>
                    <NavLink className={({ isActive }) => `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-60 cursor-pointer ${isActive ? 'bg-[#F2F3FF] border-r-4 border-primary' : ''}`} to={'/therapist/therapist-appointments'}>
                        <p>Appointments</p>
                    </NavLink>
                    <NavLink className={({ isActive }) => `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-60 cursor-pointer ${isActive ? 'bg-[#F2F3FF] border-r-4 border-primary' : ''}`} to={'/therapist/therapist-profile'}>
                        <p>Profile</p>
                    </NavLink>
                    <NavLink className={({ isActive }) => `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-60 cursor-pointer ${isActive ? 'bg-[#F2F3FF] border-r-4 border-primary' : ''}`} to={'/therapist/therapist-chatroom'}>
                        <p>Chatroom</p>
                    </NavLink>
                </ul>
            }
        </div>
    )
}

export default Sidebar
