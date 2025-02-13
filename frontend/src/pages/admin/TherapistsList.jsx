import React, { useContext, useEffect } from 'react'
import { AdminContext } from '../../context/AdminContext'
import { useNavigate } from 'react-router-dom'

const TherapistsList = () => {
    const { therapists, aToken, getAllTherapists } = useContext(AdminContext)
    const navigate = useNavigate()

    useEffect(() => {
        if (aToken) {
            getAllTherapists()
        }else{
            navigate('/')
        }
    }, [aToken])

    return (
        <div className="p-6">
            <h1 className="text-2xl font-semibold mb-4">All Therapists</h1>
            <div className="overflow-x-auto rounded-lg shadow-md">
                <table className="w-full border-collapse border border-gray-300 rounded-lg overflow-hidden">
                    <thead className="bg-primary text-white">
                        <tr>
                            <th className="border p-2">Therapist</th>
                            <th className="border p-2">Email</th>
                            <th className="border p-2">Speciality</th>
                            <th className="border p-2">Experience</th>
                            <th className="border p-2">Fees</th>
                            <th className="border p-2">Address</th>
                            <th className="border p-2">Created At</th>
                        </tr>
                    </thead>
                    <tbody>
                        {therapists.map((therapist) => (
                            <tr key={therapist._id} className="border bg-white hover:bg-gray-200">
                                <td className="p-2 flex gap-3">
                                    <img src={therapist.image} alt={therapist.name} className="bg-primary w-10 h-10 rounded-full" />
                                    <span>{therapist.name}</span>
                                </td>
                                <td className="border p-2 text-center">{therapist.email}</td>
                                <td className="border p-2 text-center">{therapist.speciality}</td>
                                <td className="border p-2 text-center">{therapist.experience}</td>
                                <td className="border p-2 text-center">Rs. {therapist.fees}</td>
                                <td className="border p-2 text-center">{therapist.address}</td>
                                <td className="border p-2 text-center">{new Date(therapist.date).toLocaleString()}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default TherapistsList
