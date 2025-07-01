import React, { useState, useEffect, useContext } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import { toast } from 'react-toastify'
import pic1 from '../assets/pic1.jpg'


const Therapists = () => {
  const { speciality } = useParams()
  const [filterTherapist, setFilterTherapist] = useState([])
  const [showFilter, setShowFilter] = useState(false)
  const navigate = useNavigate()
  const { therapists, token } = useContext(AppContext)

  const dummyTherapists = [
    {
      _id: 'dummy1',
      name: 'Dr. Jane Doe',
      speciality: 'Neurology',
      image: pic1
    }
  ]

  const dataToUse = therapists.length > 0 ? therapists : dummyTherapists

  const applyFilter = () => {
    if (speciality) {
      setFilterTherapist(dataToUse.filter(t => t.speciality === speciality))
    } else {
      setFilterTherapist(dataToUse)
    }
  }

  const authUser = (id) => {
    if (!token) {
      toast.warn('Login to Book Appointment')
      navigate('/login')
      return
    }
    navigate(`/appointment/${id}`)
  }

  useEffect(() => {
    applyFilter()
  }, [therapists, speciality])

  return (
    <div className='min-h-screen flex flex-col justify-between'>
      <div className='container max-w-7xl mx-auto px-4 py-6'>
        <p className='text-gray-600 text-lg'>Browse through the therapists specialties.</p>
        <div className='flex flex-col sm:flex-row items-start gap-5 mt-5'>
          <button 
            className={`py-2 px-4 border rounded text-sm transition-all sm:hidden ${showFilter ? 'bg-primary text-white' : ''}`} 
            onClick={() => setShowFilter(prev => !prev)}>
            Filters
          </button>
          <div className={`flex-col gap-4 text-sm text-gray-600 ${showFilter ? 'flex' : 'hidden sm:flex'}`}>
            {['Neurology', 'Career counseling', 'Social Anxiety', ' Child Psychologist', 'Family Therapy', 'Addiction Counseling'].map((item) => (
              <p key={item}
                onClick={() => speciality === item ? navigate('/therapists') : navigate(`/therapists/${item}`)}
                className={`w-full sm:w-auto px-4 py-2 border border-gray-300 rounded transition-all cursor-pointer ${speciality === item ? 'bg-indigo-100 text-black' : ''}`}>
                {item}
              </p>
            ))}
          </div>
          <div className='w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-5'>
            {filterTherapist.map((item) => (
              <div key={item._id} 
                onClick={() => authUser(item._id)} 
                className='border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-5px] transition-all duration-500 p-6 flex flex-col items-center text-center bg-white shadow-md'>
                <img className='w-32 h-32 object-cover rounded-full bg-blue-50' src={item.image} alt={item.name} />
                <div className='mt-3'>
                  <p className='text-gray-900 text-lg font-medium'>{item.name}</p>
                  <p className='text-gray-600 text-sm'>{item.speciality}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Therapists
