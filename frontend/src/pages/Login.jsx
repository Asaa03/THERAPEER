import React, { useContext, useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import { TherapistContext } from '../context/TherapistContext'
import { AdminContext } from '../context/AdminContext'

const Register = () => {

    const{setToken} = useContext(AppContext)
    const{setTToken} = useContext(TherapistContext)
    const{setAToken} = useContext(AdminContext)

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()

    const backendUrl = 'https://therapeer-backend.onrender.com'

    const onSubmitHandler = async (event) => {
        event.preventDefault()

        try {
            const userResponse = await axios.post(`${backendUrl}/api/user/login`, { email, password })
            if (userResponse.data.success) {
                localStorage.setItem('token', userResponse.data.token)
                setToken(userResponse.data.token)
                navigate('/') 
                toast.success('Successfully Logged In')
                return
            }

            const therapistResponse = await axios.post(`${backendUrl}/api/therapist/login`, { email, password })
            if (therapistResponse.data.success) {
                localStorage.setItem('tToken', therapistResponse.data.token)
                setTToken(therapistResponse.data.token)
                navigate('/therapist/therapist-dashboard')
                toast.success('Successfully Logged In')
                return
            }

            const adminResponse = await axios.post(`${backendUrl}/api/admin/login`, { email, password })
            if (adminResponse.data.success) {
                localStorage.setItem('aToken', adminResponse.data.token)
                setAToken(adminResponse.data.token)
                navigate('/admin/dashboard')
                toast.success('Successfully Logged In')
                return
            }

            toast.error('Invalid credentials. Please try again.')

        } catch (error) {
            toast.error('An error occurred. Please try again.')
        }
    }

    return (
            <form onSubmit={onSubmitHandler} className='h-[670px]  flex items-center justify-center p-4'>
            <div className='flex flex-col gap-3 m-auto items-start p-8 min-w-[450px] sm:min-w-96 border rounded-xl text-zinc-600 text-sm bg-white shadow-lg'>
                <p className='text-2xl font-semibold'>Login</p>
                <div className='w-full'>
                    <p>Email</p>
                    <input className='border border-zinc-300 rounded w-full p-2 mt-1' type='email' onChange={(e) => setEmail(e.target.value)} value={email} required />
                </div>
                <div className='w-full'>
                    <p>Password</p>
                    <input className='border border-zinc-300 rounded w-full p-2 mt-1' type='password' onChange={(e) => setPassword(e.target.value)} value={password} required />
                </div>
                <button type='submit' className='bg-primary text-white w-full py-2 rounded-md text-base'>Login</button>
                <p>Don't have an Account? <span className='text-primary underline cursor-pointer' onClick={() => navigate('/signup')}>Register Here</span></p>
            </div>
        </form>
    )
}

export default Register
