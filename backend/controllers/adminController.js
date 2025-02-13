import validator from 'validator'
import bcrypt from 'bcrypt'
import { v2 as cloudinary } from 'cloudinary'
import therapistModel from '../models/therapistModel.js'
import jwt from 'jsonwebtoken'
import appointmentModel from '../models/appointmentModel.js'
import userModel from '../models/userModel.js'

const addTherapist = async (req, res) => {

    try {
        const { name, email, password, speciality, degree, experience, about, fees, address } = req.body
        const imageFile = req.file

        if (!name || !email || !password || !speciality || !degree || !experience || !about || !fees || !address) {
            return res.json({ success: false, message: "Missing Details" })
        }

        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "Email is Invalid" })
        }

        if (password.length < 8) {
            return res.json({ success: false, message: "Password is Weak" })
        }

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const imageUpload = await cloudinary.uploader.upload(imageFile.path, { resource_type: "image" })
        const imageUrl = imageUpload.secure_url

        const therapistData = {
            name,
            email,
            image: imageUrl,
            password: hashedPassword,
            speciality,
            degree,
            experience,
            about,
            fees,
            address,
            date: Date.now()
        }

        const newTherapist = new therapistModel(therapistData)
        await newTherapist.save()

        res.json({ success: true, message: "Therapist Added" })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }

}

const loginAdmin = async (req, res) => {
    try {
        const { email, password } = req.body
        if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
            const token = jwt.sign(email + password, process.env.JWT_SECRET)
            res.json({ success: true, token })
        } else {
            res.json({ success: false, message: "Invalid Credentials" })
        }
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

const allTherapists = async (req,res) => {
    try {
        const therapists = await therapistModel.find({}).select('-password')
        res.json({success:true,therapists})
    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }
}

const allAppointments = async(req,res) =>{
    try {
        const appointments = await appointmentModel.find({})
        res.json({success:true,appointments})

    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }
}

const appointmentCancel = async(req,res) => {
    try {
        const {appointmentId} = req.body
        const appointmentData = await appointmentModel.findById(appointmentId)

        await appointmentModel.findByIdAndUpdate(appointmentId, {cancelled:true})

        const {therapistId, slotDate,slotTime} = appointmentData

        const therapistData = await therapistModel.findById(therapistId)
        let slots_booked = therapistData.slots_booked

        slots_booked[slotDate] = slots_booked[slotDate].filter(e=>e !== slotTime)
        await therapistModel.findByIdAndUpdate(therapistId,{slots_booked})

        res.json({success:true, message:"Appointment Cancelled"})

      } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }
}

const adminDashboard = async(req,res) => {
    try {
        const therapists = await therapistModel.find({})
        const users = await userModel.find({})
        const appointments = await appointmentModel.find({})

        const dashData = {
            therapists: therapists.length,
            appointments: appointments.length,
            users: users.length,
            latestAppointments: appointments.reverse().slice(0,5)
        }
        res.json({success:true,dashData})

    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }
}


export { addTherapist, loginAdmin, allTherapists, allAppointments, appointmentCancel, adminDashboard}