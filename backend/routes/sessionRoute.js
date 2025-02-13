import express from 'express'
import authUser from '../middlewares/authUser.js'
import authTherapist from '../middlewares/authTherapist.js'
import { getsessionMessages, sendsessionMessage } from '../controllers/sessionController.js'

const sessionRouter = express.Router()
sessionRouter.get("/getMessage/:appointmentId", (req, res, next) => {
    const { token, ttoken} = req.headers

    if (token) {
        return authUser(req, res, next)
    } else if (ttoken) {
        return authTherapist(req, res, next)
    } else {
        return res.json({ success: false, message: "Not Authorized" })
    }
}, getsessionMessages)
sessionRouter.post("/send", (req, res, next) => {
    const { token, ttoken} = req.headers

    if (token) {
        return authUser(req, res, next)
    } else if (ttoken) {
        return authTherapist(req, res, next)
    } else {
        return res.json({ success: false, message: "Not Authorized" })
    }
}, sendsessionMessage)

export default sessionRouter
