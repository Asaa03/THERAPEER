import React, { useContext, useEffect } from 'react'
import { AdminContext } from '../../context/AdminContext.jsx'
import { AppContext } from '../../context/AppContext.jsx';
import { useNavigate } from 'react-router-dom'


const AllAppointments = () => {
  const { aToken, appointments, getAllAppointments, cancelAppointment } = useContext(AdminContext)
  const { calculateAge, slotDateFormat, currencySymbol } = useContext(AppContext)

  const navigate = useNavigate()

  useEffect(() => {
    if (aToken) {
      getAllAppointments()
    } else {
      navigate('/')
    }
  }, [aToken]);

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
              <th className="border p-2">Therapist</th>
              <th className="border p-2">Fees</th>
              <th className="border p-2">Action</th>
            </tr>
          </thead>
          <tbody >
            {appointments.map((item, index) => (
              <tr key={item._id} className="border bg-white hover:bg-gray-200">
                <td className="border p-2 text-center">{index + 1}</td>
                <td className="p-2 flex gap-3">
                  <img className="w-10 h-10 rounded-full" src={item.userData.image} alt={item.userData.name} />
                  <span>{item.userData.name}</span>
                </td>
                <td className="border p-2 text-center">{calculateAge(item.userData.dob)}</td>
                <td className="border p-2 text-center">{slotDateFormat(item.slotDate)}, {item.slotTime}</td>
                <td className="p-2 flex  gap-3">
                  <img className="w-10 h-10 rounded-full bg-primary" src={item.therapistData.image} alt={item.therapistData.name} />
                  <span>{item.therapistData.name}</span>
                </td>
                <td className="border p-2 items-center-">{currencySymbol} {item.amount}</td>
                <td className="border p-2 text-center">
                  {
                    item.cancelled
                      ? (<p className="text-red-500 font-medium">Cancelled</p>)
                      : item.isCompleted
                        ? (<p className="text-green-500 font-medium">Completed</p>)
                        : (<button onClick={() => cancelAppointment(item._id)} className=" text-red-500 px-3 py-1 rounded-md hover:bg-red-300 hover:text-white">Cancel</button>)
                  }
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>

  );
};

export default AllAppointments;
