import express from 'express'
import { addTherapist, adminDashboard, allAppointments, allTherapists, appointmentCancel, loginAdmin } from '../controllers/adminController.js'
import upload from '../middlewares/multer.js'
import authAdmin from '../middlewares/authAdmin.js'

const adminRouter = express.Router()

adminRouter.post('/add-therapist',authAdmin,upload.single('image'),addTherapist)
adminRouter.post('/login',loginAdmin)
adminRouter.post('/all-therapists',authAdmin,allTherapists)
adminRouter.get('/appointments',authAdmin,allAppointments)
adminRouter.post('/cancel-appointment',authAdmin,appointmentCancel)
adminRouter.get('/dashboard', authAdmin,adminDashboard)

export default adminRouter