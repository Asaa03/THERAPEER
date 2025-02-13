import express from 'express'
import { createChatroom, getChatrooms, getMessages, sendMessage } from "../controllers/chatroomController.js"
import authAdmin from "../middlewares/authAdmin.js"
import authTherapist from '../middlewares/authTherapist.js'
import authUser from '../middlewares/authUser.js'

const chatroomRouter = express.Router()

chatroomRouter.post("/create-chatroom", authAdmin, createChatroom)
chatroomRouter.get('/chatroom', (req, res, next) => {
    const { token, ttoken, atoken } = req.headers

    if (token) {
        return authUser(req, res, next)
    } else if (ttoken) {
        return authTherapist(req, res, next)
    } else if (atoken) {
        return authAdmin(req, res, next)
    } else {
        return res.status(403).json({ success: false, message: "Not Authorized" })
    }
}, getChatrooms)
chatroomRouter.post("/message", (req, res, next) => {
    const { token, ttoken, atoken } = req.headers

    if (token) {
        return authUser(req, res, next)
    } else if (ttoken) {
        return authTherapist(req, res, next)
    } else if (atoken) {
        return authAdmin(req, res, next)
    } else {
        return res.status(403).json({ success: false, message: "Not Authorized" })
    }
}, sendMessage)
chatroomRouter.get("/messages", (req, res, next) => {
    const { token, ttoken, atoken } = req.headers

    if (token) {
        return authUser(req, res, next)
    } else if (ttoken) {
        return authTherapist(req, res, next)
    } else if (atoken) {
        return authAdmin(req, res, next)
    } else {
        return res.status(403).json({ success: false, message: "Not Authorized" })
    }
}, getMessages)

export default chatroomRouter
