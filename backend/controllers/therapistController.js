import therapistModel from "../models/therapistModel.js"
import bcrypt from 'bcrypt'
import jwt  from 'jsonwebtoken'
import appointmentModel from "../models/appointmentModel.js"

const therapistList = async(req,res) => {
    try {
        const therapists = await therapistModel.find({}).select(['-password','-email'])
        res.json({success:true,therapists})
    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }
}

const loginTherapist = async (req, res) => {
    try {
        const { email, password } = req.body
        const therapist = await therapistModel.findOne({ email })
        if (!therapist) {
            return res.json({ success: false, message: 'Invalid credentials' })
        }
        const isMatch = await bcrypt.compare(password, therapist.password)
        if (!isMatch) {
            return res.json({ success: false, message: 'Invalid credentials' })
        }
        const token = jwt.sign({ id: therapist._id }, process.env.JWT_SECRET)
        res.json({ success: true, token })
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: 'Server error' })
    }
};

const appointmentsTherapist = async(req,res) => {
    try {
        const { therapistId } = req.body
        const appointments = await appointmentModel.find({therapistId})

        res.json({success:true,appointments})

    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }
}

const appointmentComplete = async(req,res) => {
    try {
        const {therapistId,appointmentId} = req.body
        const appointmentData = await appointmentModel.findById(appointmentId)
        if(appointmentData && appointmentData.therapistId === therapistId){
            await appointmentModel.findByIdAndUpdate(appointmentId,{isCompleted:true})
            return res.json({success:true, message:"Appointment Completed"})
        }else{
            return res.json({success:false, message:"Failed"})
        }
    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message}) 
    }
}

const appointmentCancel = async(req,res) => {
    try {
        const {therapistId,appointmentId} = req.body
        
        const appointmentData = await appointmentModel.findById(appointmentId)
        
        if(appointmentData && appointmentData.therapistId === therapistId){
            await appointmentModel.findByIdAndUpdate(appointmentId,{cancelled:true})
            return res.json({success:true, message:"Appointment cancelled"})
        }else{
            return res.json({success:false, message:"cancellation Failed"})
        }
    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message}) 
    }
}

const therapistDashboard = async(req,res) => {
    try {
        const {therapistId} = req.body
        const appointments = await appointmentModel.find({therapistId})

        let earnings = 0
        appointments.map((item)=>{
            if(item.isCompleted){
                earnings += item.amount
            }
        })

        let users = []
        appointments.map((item)=>{
            if(!users.includes(item.userId)){
                users.push(item.userId)
            }
        })

        const dashData = {
            earnings,
            appointments: appointments.length,
            users: users.length,
            latestAppointments:appointments.reverse().slice(0,5)
        }

        res.json({success:true,dashData})

    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message}) 
    }
}

const therapistProfile = async(req,res) => {
    try {
        const {therapistId} = req.body
        const profileData = await therapistModel.findById(therapistId).select('-password')

        res.json({success:true, profileData})
    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message}) 
    }
}

const updateTherapistProfile = async(req,res) => {
    try {
        const {therapistId, fees, address} = req.body
        await therapistModel.findByIdAndUpdate(therapistId,{fees, address})
        res.json({success:true, message:"Profile Updated"})
    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message}) 
    }
}

export {therapistList, loginTherapist, appointmentsTherapist, appointmentComplete, appointmentCancel, therapistDashboard, therapistProfile, updateTherapistProfile}
