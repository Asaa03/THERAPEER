import React, { useContext, useState } from 'react'
import { AppContext } from '../context/AppContext'
import upload_area from '../assets/upload_area.png'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

const MyProfile = () => {
  const { userData, setUserData, token, backendUrl, loadUserProfileData } = useContext(AppContext)
  const [isEdit, setIsEdit] = useState(false)
  const [image, setImage] = useState(null)
  const [formData, setFormData] = useState({ ...userData })
  const navigate = useNavigate()

  if(!token){
    navigate('/')
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    setImage(file)
  }

  const updateUserProfileData = async () => {
    try {
      const dataToSend = new FormData()
      dataToSend.append('name', formData.name)
      dataToSend.append('phone', formData.phone)
      dataToSend.append('address', formData.address)
      dataToSend.append('gender', formData.gender)
      dataToSend.append('dob', formData.dob)
      if (image) dataToSend.append('image', image)

      const { data } = await axios.post(backendUrl + '/api/user/update-profile', dataToSend, { headers: { token }})

      if (data.success) {
        toast.success(data.message)
        await loadUserProfileData()
        setIsEdit(false)
        setImage(null)
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  return (
    <div className="w-full min-h-screen flex items-center justify-center mt- px-6">
      <div className="w-full max-w-7xl flex flex-col gap-4 text-sm bg-white p-6 shadow-md rounded-lg">
        {userData && (
          <div className="flex-grow flex flex-col gap-4 text-sm">
            <label htmlFor="image">
              <div className="relative w-40 cursor-pointer">
                <img className="w-full rounded-lg" src={image ? URL.createObjectURL(image) : userData.image} alt="Profile" onLoad={() => image && URL.revokeObjectURL(image)}/>
                {isEdit && <img className="absolute bottom-4 right-4 w-8" src={upload_area} alt="Upload" />}
              </div>
            </label>
            {isEdit && <input type="file" id="image" hidden onChange={handleImageChange} />}

            {isEdit ? (
              <input className="bg-gray-50 text-3xl font-medium w-full mt-4" type="text" name="name" value={formData.name} onChange={handleChange}/>
            ) : (
              <p className="font-medium text-3xl text-neutral-800 mt-4">{userData.name}</p>
            )}

            <hr className="bg-zinc-400 h-[1px] border-none" />

            <div>
              <p className="text-neutral-500 underline mt-3">CONTACT INFORMATION</p>
              <div className="grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-neutral-700">
                <p className="font-medium">Email Id:</p>
                <p className="text-blue-500">{userData.email}</p>
                <p className="font-medium">Phone:</p>
                {isEdit ? (
                  <input className="bg-gray-100 w-full max-w-xs" type="text" name="phone" value={formData.phone} onChange={handleChange} />
                ) : (
                  <p className="text-blue-400">{userData.phone}</p>
                )}
                <p className="font-medium">Address:</p>
                {isEdit ? (
                  <input className="bg-gray-50 w-full" type="text" name="address" value={formData.address} onChange={handleChange} />
                ) : (
                  <p className="text-gray-500">{userData.address}</p>
                )}
              </div>
            </div>

            <div>
              <p className="text-neutral-500 underline mt-3">BASIC INFORMATION</p>
              <div className="grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-neutral-700">
                <p className="font-medium">Gender:</p>
                {isEdit ? (
                  <select className="w-full max-w-24 bg-gray-100" name="gender" value={formData.gender} onChange={handleChange}>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                ) : (
                  <p className="text-gray-400">{userData.gender}</p>
                )}
                <p className="font-medium">Date of Birth:</p>
                {isEdit ? (
                  <input className="w-full max-w-32 bg-gray-100" type="date" name="dob" value={formData.dob} onChange={handleChange} />
                ) : (
                  <p className="text-gray-400">{userData.dob}</p>
                )}
              </div>
            </div>

            <div className="mt-10 flex gap-4">
              {isEdit ? (
                <>
                  <button className="border border-primary px-8 py-2 rounded-full hover:bg-primary hover:text-white transition-all" onClick={updateUserProfileData}> Save </button>
                  <button className="border border-gray-400 px-8 py-2 rounded-full hover:bg-gray-200 transition-all" onClick={() => { setIsEdit(false), setFormData({ ...userData }) }}> Cancel</button>
                </>
              ) : (
                <button className="border border-primary px-8 py-2 rounded-full hover:bg-primary hover:text-white transition-all" onClick={() => { setIsEdit(true), setFormData({ ...userData }) }}> Edit</button>)}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default MyProfile
