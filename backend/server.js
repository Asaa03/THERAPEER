import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import 'dotenv/config'
import connectDB from './config/mongodb.js'
import connectCloudinary from './config/cloudinary.js'
import adminRouter from './routes/adminRoute.js'
import therapistRouter from './routes/therapistRoute.js'
import userRouter from './routes/userRoute.js'
import http from 'http'
import { Server } from 'socket.io'
import sessionRouter from './routes/sessionRoute.js'
import chatroomRouter from './routes/chatroomRoute.js'
import { sendMessage, getMessages, createChatroom, getChatrooms } from './controllers/chatroomController.js'
import { getsessionMessages, sendsessionMessage } from './controllers/sessionController.js'

dotenv.config({ path: "../.env" })

const app = express()
const port = process.env.PORT || 5001

const server = http.createServer(app)
const io = new Server(server, {
  cors: {
    origin: "https://therapeer-frontend.onrender.com/", 
    methods: ["GET", "POST"]
  }
})

connectDB()
connectCloudinary()

app.use(express.json())
app.use(cors())

app.use('/api/admin', adminRouter)
app.use('/api/therapist', therapistRouter)
app.use('/api/user', userRouter)
app.use('/api/chatroom', chatroomRouter)
app.use('/api/session', sessionRouter)


io.on("connection", (socket) => {
  console.log("A user connected")

  socket.on("newMessage", (newMessage) => {
    io.emit("newMessage", newMessage) 
  })

  socket.on("disconnect", () => {
    console.log("A user disconnected")
  })
})

app.post("/api/chatroom/message", sendMessage)  
app.get("/api/chatroom/messages", getMessages) 
app.post("/api/chatroom/create-chatroom", createChatroom)  
app.get("/api/chatroom", getChatrooms)  

app.get('/api/session/getMessage/:appointmentId',getsessionMessages)
app.post('/api/session/send',sendsessionMessage)

app.get('/', (req, res) => {
  res.send('API WORKING')
})

server.listen(port, () => {
  console.log('Server Started on port ', port)
})
