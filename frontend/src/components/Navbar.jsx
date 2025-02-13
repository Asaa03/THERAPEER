import { useContext, useState, useEffect, useRef } from "react"
import { NavLink, useNavigate } from "react-router-dom"
import { AppContext } from "../context/AppContext"
import logo from '../assets/logo.jpg'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const { token, setToken, userData } = useContext(AppContext)
  const dropdownRef = useRef(null)
  const navigate = useNavigate()

  const logout = () => {
    setToken(null)
    localStorage.removeItem("token")
  }

  const handleClickOutside = (e) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
      setIsOpen(false)
    }
  }

  useEffect(() => {
    document.addEventListener('click', handleClickOutside)
    return () => {
      document.removeEventListener('click', handleClickOutside)
    }
  }, [])

  return (
    <div className="flex justify-between items-center  px-6  py-3 border-b bg-white">
      <div className="container max-w-7xl mx-auto flex items-center space-x-6">
        
        <img className="w-28 cursor-pointer" src={logo} alt="Therapeer" />

        <div className="hidden md:flex flex-grow justify-center space-x-6 text-lg">
          <NavLink to="/" className="hover:text-primary">Home</NavLink>
          <NavLink to="/therapists" className="hover:text-primary">Therapists</NavLink>
          <NavLink to="/about" className="hover:text-primary">About Us</NavLink>
          {
            token && (
              <NavLink to="/chatroom" className="hover:text-primary">ChatRoom</NavLink>
            )
          }
        </div>

        <div className="relative hidden md:block">
          {token && userData ? (
            <div>
              <button  onClick={(e) => {e.stopPropagation(), setIsOpen(!isOpen)}}  className="flex items-center space-x-2 focus:outline-none">
                <img className="w-10 h-10 rounded-full border border-gray-300" src={userData.image} alt="Profile" />
              </button>

              {isOpen && (
                <div ref={dropdownRef} className="absolute right-0 mt-2 w-44 bg-white text-gray-800 shadow-lg rounded-lg border border-gray-300">
                  <NavLink to="/my-profile" className="block px-4 py-2 hover:bg-gray-200" onClick={() => setIsOpen(false)}>Profile</NavLink>
                  <NavLink to="/my-appointments" className="block px-4 py-2 hover:bg-gray-200" onClick={() => setIsOpen(false)}>Appointments</NavLink>
                  <NavLink to="/login" className="block px-4 py-2 hover:bg-gray-200" onClick={() => setIsOpen(false)}>Dashboard</NavLink>
                  <button onClick={logout} className="block w-full text-left px-4 py-2 hover:bg-red-100 text-red-600"> Logout </button>
                </div>
              )}
            </div>
          ) : (
            <button onClick={() => navigate('/login')} className="bg-primary text-white px-4 py-2 rounded-md "> Login</button>
          )}
        </div>
      </div>
    </div>
  )
}

export default Navbar
