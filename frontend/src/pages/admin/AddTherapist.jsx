import React, { useContext, useState } from 'react'
import  upload_area  from '../../assets/upload_area.jpg'
import { AdminContext } from '../../context/AdminContext'
import { toast } from 'react-toastify'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const AddTherapist = () => {

    const [therapistImg,setTherapistImg] = useState(false)
    const [name,setName] = useState('')
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [experiencee,setExperience] = useState('1 Year')
    const [fees,setFees] = useState('')
    const [about,setAbout] = useState('')
    const [speciality,setSpeciality] = useState('General Physician')
    const [degree,setDegree] = useState('')
    const [address,setAddress] = useState('')

    const navigate = useNavigate()

    const {backendUrl, aToken} = useContext(AdminContext)

    const onSubmitHandler = async (event) =>{
        event.preventDefault()

        try {
            
            if(!therapistImg){
                return toast.error('Image Not Selected')
            }

            const formData = new FormData()
            formData.append('image',therapistImg)
            formData.append('name',name)
            formData.append('email',email)
            formData.append('password',password)
            formData.append('experience',experiencee)
            formData.append('fees',Number(fees))
            formData.append('about',about)
            formData.append('speciality',speciality)
            formData.append('degree',degree)
            formData.append('address',address)

            formData.forEach((value,key)=>{
                console.log(`${key} : ${value}`)
            })

            const {data} = await axios.post(backendUrl + '/api/admin/add-therapist',formData, {headers:{aToken}})

            if(data.success){
                toast.success(data.message)
                setTherapistImg(false)
                setName('')
                setEmail('')
                setPassword('')
                setAddress('')
                setDegree('')
                setFees('')
                setAbout('')
            }else{
                toast.error(data.message)
            }

        } catch (error) {
            toast.error(error.message)
            console.log(error)
        }

    }

    if(!aToken){
        navigate('/')
    }

  return (
    <form onSubmit={onSubmitHandler} className='m-5 w-full'>
        <p className='mb-3 text-lg font-medium'>Add Therapist</p>

        <div className='bg-white px-8 py-8 border rounded w-full max-w-4xl max-h-[80vh] overflow-y-scroll'>
            <div className='flex items-center gap-4 mb-8 text-gray-500'>
                <label htmlFor='therapist-img'>
                    <img className='w-16 bg-gray-10 rounded-full cursor-pointer' src={therapistImg ? URL.createObjectURL(therapistImg) : upload_area} alt=''/>
                </label>
                <input onChange={(e)=> setTherapistImg(e.target.files[0])} type='file' id='therapist-img' hidden/>
                <p>Upload Therapist <br/> picture</p>
            </div>

            <div className='flex flex-col lg:flex-row items-start gap-10 text-gray-600'>
                <div className='w-full lg:flex-1 flex flex-col gap-4'>
                    <div className='flex-1 flex flex-col gap-1'>
                        <p>Therapist Name</p>
                        <input onChange={(e)=> setName(e.target.value)} value={name} className='border rounded px-3 py-2' type='text' placeholder='Name' required />
                    </div>
                    <div className='flex-1 flex flex-col gap-1'>
                        <p>Therapist Email</p>
                        <input onChange={(e)=> setEmail(e.target.value)} value={email} className='border rounded px-3 py-2' type='email ' placeholder='Email' required />
                    </div>
                    <div className='flex-1 flex flex-col gap-1'>
                        <p>Therapist Password</p>
                        <input onChange={(e)=> setPassword(e.target.value)} value={password} className='border rounded px-3 py-2' type='password' placeholder='Password' required />
                    </div>
                    <div className='flex-1 flex flex-col gap-1'>
                        <p>Experience</p>
                        <select onChange={(e)=> setExperience(e.target.value)} value={experiencee} className='border rounded px-3 py-2' name='' id=''>
                            <option value="1 Year">1 Year</option>
                            <option value="2 Year">2 Year</option>
                            <option value="3 Year">3 Year</option>
                            <option value="4 Year">4 Year</option>
                            <option value="5 Year">5 Year</option>
                            <option value="6 Year">6 Year</option>
                            <option value="7 Year">7 Year</option>
                            <option value="8 Year">8 Year</option>
                            <option value="9 Year">9 Year</option>
                            <option value="10 Year">10 Year</option>
                        </select>
                    </div>
                    <div className='flex-1 flex flex-col gap-1'>
                        <p>Fees</p>
                        <input onChange={(e)=> setFees(e.target.value)} value={fees} className='border rounded px-3 py-2' type='number' placeholder='fees' required />
                    </div>
                </div>
                <div className='w-full lg:flex-1 flex flex-col gap-4'>
                    <div className='flex-1 flex flex-col gap-1'>
                        <p>Speciality</p>

                        <select onChange={(e)=> setSpeciality(e.target.value)} value={speciality} className='border rounded px-3 py-2' name='' id=''>
                            <option value="Neurology">Neurology</option>
                            <option value="Career counseling">Career counseling</option>
                            <option value="Social Anxiety">Social Anxiety</option>
                            <option value="Child Psychologist">Child Psychologist</option>
                            <option value="Family Therapy">Family Therapy</option>
                            <option value="Addiction Counseling">Addiction Counseling</option>
                        </select>
                    </div>

                    <div className='flex-1 flex flex-col gap-1'>
                        <p>Education</p>
                        <input onChange={(e)=> setDegree(e.target.value)} value={degree} className='border rounded px-3 py-2' type='text' placeholder='Education' required />
                    </div>

                    <div className='flex-1 flex flex-col gap-1'>
                        <p>Address</p>
                        <input onChange={(e)=> setAddress(e.target.value)} value={address} className='border rounded px-3 py-2' type='text' placeholder='Address' required />
                    </div>
                </div>
            </div>

            <div>
                <p className='mt-4 mb-2'>About Therapist</p>
                <textarea onChange={(e)=> setAbout(e.target.value)} value={about} className='w-full px-4 pt-2 border rounded' placeholder='Write About Therapist ...' rows={5} required />
            </div>

            <button type='submit' className='bg-primary px-10 py-3 mt-4 text-white rounded-full'>Add Therapist</button>
        </div>

    </form>
  )
}

export default AddTherapist
