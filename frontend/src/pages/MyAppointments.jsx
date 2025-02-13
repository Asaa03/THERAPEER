import { useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { AppContext } from "../context/AppContext"
import { toast } from "react-toastify"
import axios from "axios"

const MyAppointments = () => {
  const { backendUrl, token, getTherapistsData } = useContext(AppContext)
  const [appointments, setAppointments] = useState([])
  const navigate = useNavigate()

  const getUserAppointments = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/user/appointments", { headers: { token } })
      if (data.success) {
        setAppointments(data.appointments.reverse())
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  const cancelAppointment = async (appointmentId) => {
    try {
      const { data } = await axios.post(backendUrl + '/api/user/cancel-appointment', { appointmentId }, { headers: { token } })
      if (data.success) {
        toast.success(data.message)
        getUserAppointments()
        getTherapistsData()
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  const session = (id) => {
    navigate(`/chat/${id}`)
  }

  useEffect(() => {
    if (token) {
      getUserAppointments()
    }else{
      navigate('/')
    }
  }, [token])

  return (
    <div className="max-w-4xl mx-auto mt-12 px-4 pb-12">
      <p className="text-2xl font-semibold text-zinc-700 pb-3 border-b">
        My Appointments
      </p>

      <div className="bg-white shadow-md p-4 rounded-lg mt-6">
        {appointments.map((item, index) => (
          <div
            key={index}
            className="flex flex-col sm:flex-row gap-4 sm:gap-6 p-4 border rounded-lg shadow-sm"
          >
            {!item.cancelled && !item.isCompleted ? (
              <div
                className="cursor-pointer w-32 h-32 bg-indigo-50 rounded-lg overflow-hidden"
                onClick={() => session(item._id)}
              >
                <img
                  className="w-full h-full object-cover"
                  src={item.therapistData.image}
                  alt=""
                />
              </div>
            ) : (
              <div className="w-32 h-32 bg-gray-200 rounded-lg overflow-hidden">
                <img
                  className="w-full h-full object-cover"
                  src={item.therapistData.image}
                  alt=""
                />
              </div>
            )}

            <div className="flex-1 text-sm text-zinc-600">
              <p className="text-lg font-semibold text-neutral-800">
                {item.therapistData.name}
              </p>
              <p className="text-sm text-gray-600">{item.therapistData.speciality}</p>

              <p className="text-xs mt-6">
                <span className="text-sm text-neutral-700 font-medium">
                  Date & Time:
                </span>{" "}
                {item.slotDate} | {item.slotTime}
              </p>
            </div>

            <div className="flex flex-col justify-between gap-2">
              {!item.cancelled && !item.isCompleted && (
                <>
                  <button onClick={() => cancelAppointment(item._id)} className="text-sm text-stone-500 py-2 px-4 border hover:bg-red-600 hover:text-white transition-all duration-300 rounded-md">
                    Cancel Appointment
                  </button>
                </>
              )}
              {item.cancelled && !item.isCompleted && (
                <button className="sm:min-w-48 py-2 px-4 border border-red-500 rounded-md text-red-500">
                  Appointment Cancelled
                </button>
              )}
              {item.isCompleted && (
                <button className="sm:min-w-48 py-2 px-4 border border-green-500 rounded-md text-green-500">
                  Completed
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default MyAppointments
