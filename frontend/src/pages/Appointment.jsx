import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import { toast } from 'react-toastify'
import axios from 'axios'

const Appointment = () => {
  const { therapistId } = useParams()
  const { therapists, currencySymbol, backendUrl, token, getTherapistsData } = useContext(AppContext)
  const daysOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']
  const navigate = useNavigate()
  
  const [therapistInfo, setTherapistInfo] = useState(null)
  const [therapistSlots, setTherapistSlots] = useState([])
  const [slotIndex, setSlotIndex] = useState(0)
  const [slotTime, setSlotTime] = useState('')

  const fetchTherapistInfo = () => {
    const therapistInfo = therapists.find(therapist => therapist._id === therapistId)
    setTherapistInfo(therapistInfo)
    console.log(therapistInfo)
  }

  const getAvailableSlots = () => {
    setTherapistSlots([]) 
    const today = new Date()

    for (let i = 0; i < 7; i++) {
      const currentDate = new Date(today)
      currentDate.setDate(today.getDate() + i)

      const endTime = new Date(currentDate)
      endTime.setHours(21, 0, 0, 0)

      if (i === 0) {
        currentDate.setHours(Math.max(currentDate.getHours() + 1, 10))
        currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0)
      } else {
        currentDate.setHours(10, 0, 0, 0)
      }

      const timeSlots = []
      while (currentDate < endTime) {
        const formattedTime = currentDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        timeSlots.push({ datetime: new Date(currentDate), time: formattedTime })
        currentDate.setMinutes(currentDate.getMinutes() + 30)
      }

      setTherapistSlots(prev => [...prev, timeSlots])
    }
  }

  const bookAppointment = async() => {
    try{
      const date = therapistSlots[slotIndex][0].datetime

      let day = date.getDate()
      let month = date.getMonth()+1
      let year = date.getFullYear()

      const slotDate = day + "_" + month + "_" + year

      const {data} = await axios.post(backendUrl+'/api/user/book-appointment',{therapistId, slotDate,slotTime},{headers:{token}})
      if(data.success){
        toast.success(data.message)
        getTherapistsData()
        navigate('/my-appointments')
      }else{
        toast.error(data.message)
      }

    }catch(error){
      console.log(error)
      toast.error(error.message)
    }
  }

  useEffect(() => {
    fetchTherapistInfo()
  }, [therapists, therapistId])

  useEffect(() => {
    if (therapistInfo) getAvailableSlots()
  }, [therapistInfo])

  if(!token){
    navigate('/')
  }

  return therapistInfo && (
    <div className="pt-16"> 
  
      <div className="flex flex-col sm:flex-row max-w-7xl m-auto gap-8 p-6">
        <div>
          <img className='w-full sm:max-w-[300px] rounded-lg bg-primary' src={therapistInfo.image} alt='' />
        </div>
        <div className='flex-1 border border-gray-400 rounded-lg p-8 py-7 bg-white'>
          <p className='text-2xl font-medium text-gray-900 flex items-center gap-2'> {therapistInfo.name}</p>
          <div className='flex items-center gap-2 text-sm mt-2 text-gray-600'>
            <p>{therapistInfo.degree} - {therapistInfo.speciality}</p>
            <button className='py-0.5 px-2 border text-xs rounded-full'>{therapistInfo.experience}</button>
          </div>
          <p className='text-sm font-medium text-gray-900 mt-3'>About</p>
          <p className='text-sm text-gray-500'>{therapistInfo.about}</p>
          <p className='text-gray-500 font-medium mt-4'>
            Appointment fee: <span className='text-gray-600'>{currencySymbol}{therapistInfo.fees}</span>
          </p>
        </div>
      </div>

      <div className='sm:ml-72 sm:pl-4 mt-6'>
        <p className="font-medium text-gray-700">Booking slots</p>
        <div className='flex gap-4 items-center w-full overflow-x-scroll mt-4'>
          {therapistSlots.map((daySlots, index) => (
            <div
              onClick={() => setSlotIndex(index)}
              className={`text-center py-6 min-w-16 rounded-full cursor-pointer ${slotIndex === index ? 'bg-primary text-white' : 'border border-gray-200'}`}
              key={index}
            >
              <p>{daysOfWeek[daySlots[0]?.datetime.getDay()]}</p>
              <p>{daySlots[0]?.datetime.getDate()}</p>
            </div>
          ))}
        </div>
        <div className='flex items-center gap-3 w-full overflow-x-scroll mt-4'>
          {therapistSlots[slotIndex]?.map((slot, index) => (
            <p key={index} onClick={() => setSlotTime(slot.time)} className={`text-sm font-light flex-shrink-0 px-5 py-2 rounded-full cursor-pointer ${slotTime === slot.time ? 'bg-primary text-white' : ' text-gray-400 border border-gray-300'}`}>{slot.time.toLowerCase()}</p>
          ))}
        </div>
        <button onClick={bookAppointment} className='bg-primary text-white text-sm font-light px-14 py-3 rounded-full my-6'>Book an Appointment</button>
      </div>

    </div>
  )
}

export default Appointment
