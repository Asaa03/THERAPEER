import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { AppContext } from '../context/AppContext'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

const SignUp = () => {

    const {backendUrl,token,setToken} = useContext(AppContext)
    const navigate = useNavigate()


    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [name, setName] = useState('')
    const [gender, setGender] = useState('')
    const [phone, setPhone] = useState('')
    const [address, setAddress] = useState('')

    const onSubmitHandler = async (event) => {
        event.preventDefault()
        
        try {
            const {data} = await axios.post(backendUrl + '/api/user/register', {name,email,password,gender,phone,address})
            if(data.success){
                localStorage.setItem('token',data.token)
                setToken(data.token)
                navigate('/')
                toast.success('Registration Successfull')
            }else{
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    return (
        <form onSubmit={onSubmitHandler} className='min-h-screen flex items-center justify-center  p-4'>
            <div className='flex flex-col gap-3 m-auto items-start p-8 w-full max-w-md  border rounded-xl bg-white text-zinc-600 text-sm shadow-lg'>
                <p className='text-2xl font-semibold'>Create Account</p>
                <div className='w-full'>
                    <p>Full Name</p>
                    <input className='border border-zinc-300 rounded w-full p-2 mt-1' type='text' onChange={(e) => setName(e.target.value)} value={name} required />
                </div>
                <div className='w-full'>
                    <p>Email</p>
                    <input className='border border-zinc-300 rounded w-full p-2 mt-1' type='email' onChange={(e) => setEmail(e.target.value)} value={email} required />
                </div>
                <div className='w-full'>
                    <p>Password</p>
                    <input className='border border-zinc-300 rounded w-full p-2 mt-1' type='password' onChange={(e) => setPassword(e.target.value)} value={password} required />
                </div>
                <div className='w-full'>
                    <p>Gender</p>
                    <select className='border border-zinc-300 rounded w-full p-2 mt-1' onChange={(e) => setGender(e.target.value)} value={gender} required>
                        <option value="">Select Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                    </select>
                </div>
                <div className='w-full'>
                    <p>Phone Number</p>
                    <input className='border border-zinc-300 rounded w-full p-2 mt-1' type='tel' onChange={(e) => setPhone(e.target.value)} value={phone} required />
                </div>
                <div className='w-full'>
                    <p>Address</p>
                    <input className='border border-zinc-300 rounded w-full p-2 mt-1' type='text' onChange={(e) => setAddress(e.target.value)} value={address} required />
                </div>
                <button type='submit' className='bg-primary text-white w-full py-2 rounded-md text-base'> Sign Up</button>
                <p>Already have Account? <span className='text-primary underline cursor-pointer' onClick={()=>navigate('/login')}>Login Here</span></p>

            </div>
        </form>
    )
}

export default SignUp
