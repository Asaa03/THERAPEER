import React, { useContext, useEffect } from 'react'
import { TherapistContext } from '../../context/TherapistContext'
import { AppContext } from '../../context/AppContext'
import { useNavigate } from 'react-router-dom'

const TherapistAppointments = () => {
  const { tToken, appointments, getAppointments, completeAppointment, cancelAppointment } = useContext(TherapistContext)
  const { calculateAge, slotDateFormat, currencySymbol } = useContext(AppContext)
  const navigate = useNavigate()


  useEffect(() => {
    if (tToken) {
      getAppointments()
    }else{
      navigate('/')
    }
  }, [tToken])

  const session = (id) => {
    navigate(`/therapist/session/${id}`)
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">All Appointments</h1>

      <div className="overflow-x-auto rounded-lg shadow-md">
        <table className="w-full border-collapse border border-gray-300 rounded-lg overflow-hidden">
          <thead className="bg-primary text-white">
            <tr>
              <th className="border p-2">#</th>
              <th className="border p-2">User</th>
              <th className="border p-2">Age</th>
              <th className="border p-2">Date & Time</th>
              <th className="border p-2">Fees</th>
              <th className="border p-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {
              appointments.map((item, index) => (
                <tr key={item._id} className="border bg-white hover:bg-gray-200">
                  <td className="p-2 border text-center">{index + 1}</td>
                  {!item.cancelled && !item.isCompleted ? (
                    <td className="p-2 flex gap-3">
                      <img onClick={() => session(item._id)} src={item.userData.image} alt='' className="bg-primary w-10 h-10 rounded-full" />
                      <span className='p-2 '>{item.userData.name}</span>
                    </td>
                  ) : (
                    <td className="p-2 flex gap-3">
                      <img src={item.userData.image} alt='' className="bg-primary w-10 h-10 rounded-full" />
                      <span className='p-2'>{item.userData.name}</span>
                    </td>
                  )

                  }
                  <td className="border p-2 text-center">{calculateAge(item.userData.dob)}</td>
                  <td className="border p-2 text-center">{slotDateFormat(item.slotDate)}, {item.slotTime}</td>
                  <td className="border p-2 text-center">{currencySymbol}{item.amount}</td>
                  <td className="border p-2 text-center">
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
                  </td>

                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default TherapistAppointments
