import React, { useContext, useEffect } from 'react'
import { AdminContext } from '../../context/AdminContext'
import { AppContext } from '../../context/AppContext'
import { useNavigate } from 'react-router-dom'

const Dashboard = () => {
  const { aToken, getDashData, cancelAppointment, dashData } = useContext(AdminContext)
  const { slotDateFormat } = useContext(AppContext)
  const navigate = useNavigate()

  useEffect(() => {
    if (aToken) {
      getDashData()
    } else {
      navigate('/')
    }
  }, [aToken])

  return dashData && (
    <div className='m-5'>
      <div className='grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6'>
        <div className='bg-white shadow-md p-4 rounded-lg text-center'>
          <p className='text-2xl font-semibold'>{dashData.therapists}</p>
          <p className='text-gray-600'>Therapists</p>
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
                <img src={item.therapistData.image} alt='{item.therapistData.name}' className="w-12 h-12 rounded-full bg-primary" />
                <div className='flex-1'>
                  <p className='font-medium'>{item.therapistData.name}</p>
                  <p className='font-light'>{slotDateFormat(item.slotDate)}</p>
                </div>
                {
                    item.cancelled
                      ? (<p className="text-red-500 font-medium">Cancelled</p>)
                      : item.isCompleted
                        ? (<p className="text-green-500 font-medium">Completed</p>)
                        : (<button onClick={() => cancelAppointment(item._id)} className=" text-red-500 px-3 py-1 rounded-md hover:bg-red-300 hover:text-white">Cancel</button>)
                  }

              </div>
            ))
          }
        </div>
      </div>
    </div>
  )
}

export default Dashboard
