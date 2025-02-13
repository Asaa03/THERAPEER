import React, { useContext, useEffect } from 'react'
import { TherapistContext } from '../../context/TherapistContext'
import { AppContext } from '../../context/AppContext'
import { useNavigate } from 'react-router-dom'

const TherapistDashboard = () => {

  const { tToken, dashData, setDashData, getDashData, cancelAppointment, completeAppointment } = useContext(TherapistContext)
  const { currencySymbol, slotDateFormat } = useContext(AppContext)
  const navigate = useNavigate()

  useEffect(() => {
    if (tToken) {
      getDashData()
    }else{
      navigate('/')
    }
  }, [tToken])

  return dashData && (
    <div className='m-5'>
      <div className='grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6'>
        <div className='bg-white shadow-md p-4 rounded-lg text-center'>
          <p className='text-2xl font-semibold'>{dashData.earnings}</p>
          <p className='text-gray-600'>{currencySymbol}Earnings</p>
        </div>
        <div className='bg-white shadow-md p-4 rounded-lg text-center'>
          <p className='text-2xl font-semibold'>{dashData.appointments}</p>
          <p className='text-gray-600'>Appointments</p>
        </div>
        <div className='bg-white shadow-md p-4 rounded-lg text-center'>
          <p className='text-2xl font-semibold'>{dashData.users}</p>
          <p className='text-gray-600'>Users</p>
        </div>
      </div>

      <div className='bg-white shadow-md p-4 rounded-lg'>
        <h2 className='text-xl font-semibold mb-3'>Latest Bookings</h2>
        <div className='space-y-4'>
          {
            dashData.latestAppointments.map((item, index) => (
              <div key={index} className="flex items-center gap-4 p-3 border rounded-lg hover:bg-gray-100">
                <img src={item.userData.image} alt='' className="w-12 h-12 rounded-full" />
                <div className='flex-1'>
                  <p className='font-medium'>{item.userData.name}</p>
                  <p className='font-light'>{slotDateFormat(item.slotDate)}</p>
                </div>
                {
                  item.cancelled ? (
                    <span className="text-red-500 font-semibold">Cancelled</span>
                  ) : item.isCompleted ? (
                    <span className="text-green-500 font-semibold">Completed</span>
                  ) : (
                    <div className="flex justify-center gap-2">
                      <button onClick={() => cancelAppointment(item._id)} className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition">Cancel</button>
                      <button onClick={() => completeAppointment(item._id)} className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 transition">Completed</button>
                    </div>
                  )
                }
              </div>
            ))
          }
        </div>
      </div>
    </div>
  )
}

export default TherapistDashboard
