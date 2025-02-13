import express from 'express'
import {  appointmentCancel, appointmentComplete, appointmentsTherapist, loginTherapist, therapistDashboard, therapistList, therapistProfile, updateTherapistProfile } from '../controllers/therapistController.js'
import authTherapist from '../middlewares/authTherapist.js'

const therapistRouter = express.Router()

therapistRouter.get('/therapist-list',therapistList)
therapistRouter.post('/login',loginTherapist)
therapistRouter.get('/appointments',authTherapist,appointmentsTherapist)
therapistRouter.post('/complete-appointment',authTherapist,appointmentComplete)
therapistRouter.post('/cancel-appointment',authTherapist,appointmentCancel)
therapistRouter.get('/dashboard',authTherapist,therapistDashboard)
therapistRouter.get('/profile',authTherapist,therapistProfile)
therapistRouter.post('/update-profile', authTherapist, updateTherapistProfile)

export default therapistRouter