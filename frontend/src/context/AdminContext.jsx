import axios from 'axios'
import {createContext, useState} from 'react'
import { toast } from 'react-toastify'

export const AdminContext = createContext()

const AdminContextProvider = (props) => {
    const [aToken,setAToken] = useState(localStorage.getItem('aToken') ? localStorage.getItem('aToken') : '')
    const [therapists,setTherapists] = useState([])
    const [appointments, setAppointments] = useState([])
    const backendUrl = 'https://therapeer-backend.onrender.com'
    const [dashData, setDashData] = useState(false)


    const getAllTherapists = async () => {
        try {
            const {data} = await axios.post(backendUrl + '/api/admin/all-therapists',{},{headers:{aToken}})
            if(data.success){
                setTherapists(data.therapists.reverse())
                console.log(data.therapists)
            }else{
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    const getAllAppointments = async() => {
        try {
            const {data} = await axios.get(backendUrl + '/api/admin/appointments',{headers:{aToken}})
    
            if(data.success){
                setAppointments(data.appointments.reverse())
            }else{
                toast.error(data.message)
            }
        } 
        catch (error) {
            toast.error(error.message) 
        }
    }

    const cancelAppointment = async(appointmentId) => {
        try {
            const {data} = await axios.post(backendUrl + '/api/admin/cancel-appointment',{appointmentId}, {headers:{aToken}})
            if(data.success){
                toast.success(data.message)
                getAllAppointments()
                getDashData()
            }else{
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message) 
        }
    }
    
    const getDashData = async() => {
        try {
            const {data} = await axios.get(backendUrl + '/api/admin/dashboard', {headers:{aToken}})
            if(data.success){
                setDashData(data.dashData)
            }else{
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message) 

        }
    }

    const value = {
        aToken,setAToken,
        backendUrl, therapists,
        getAllTherapists,
        appointments, setAppointments,
        getAllAppointments, 
        cancelAppointment,
        dashData, getDashData
    }

    return (
        <AdminContext.Provider value={value}>
            {props.children}
        </AdminContext.Provider>
    )
}


export default AdminContextProvider
