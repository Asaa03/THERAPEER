import React, { useContext } from 'react'
import {useNavigate} from 'react-router-dom'
import logo from '../../assets/logo.jpg'
import { TherapistContext } from '../../context/TherapistContext'

const Navbar = () => {
    const {tToken,setTToken} = useContext(TherapistContext)

    const navigate = useNavigate()

    const logout = () => {
        navigate('/')
        tToken && setTToken('')
        tToken && localStorage.removeItem('tToken')
    }
  return (
    <div className='flex justify-between items-center px-4 sm:px-10 py-3 border-b bg-white'>
      <div className='flex items-center gap-2 text-xs'>
        <img className='w-28 cursor-pointer' src={logo} alt='' />
        <p className='border px-2.5 py-0.5 rounded-full border-gray-500 text-gray-600'>Therapist</p>
      </div>
      <button onClick={logout} className='bg-primary text-white text-sm px-10 py-2 rounded-full'>Logout</button>
    </div>
  )
}

export default Navbar
