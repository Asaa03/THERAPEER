import chatroomModel from "../models/chatroomModel.js"

const createChatroom = async (req, res) => {
  try {
    const chatroom = await chatroomModel.findOne()
    if (!chatroom) {
      const newChatroom = new chatroomModel({ messages: [] })
      await newChatroom.save()
      return res.status(201).json({ message: "Default chatroom created", chatroom: newChatroom })
    }
    res.json({ success: true, message: "Chatroom already exists", chatroom })
  } catch (error) {
    res.json({ success: false, message: "Error creating chatroom", error })
  }
}

const getChatrooms = async (req, res) => {
  try {
    const chatrooms = await chatroomModel.find()
    res.json(chatrooms)
  } catch (error) {
    res.json({ message: "Error fetching chatrooms", error })
  }
}

const sendMessage = async (req, res) => {
  try {
    const { message } = req.body
    const senderId = req.body.therapistId || req.body.userId
    if (!message.trim()) {
      return res.json({ message: "Message cannot be empty" })
    }
    const newMessage = { message }
    if (req.body.therapistId) {
      newMessage.senderTherapist = senderId
    } else {
      newMessage.senderUser = senderId
    }
    let chatroom = await chatroomModel.findOne()
    if (!chatroom) {
      chatroom = new chatroomModel({ messages: [newMessage] })
    } else {
      chatroom.messages.push(newMessage)
    }

    await chatroom.save()
    res.json({ success: true,newMessage })
  } catch (error) {
    res.json({ success: false,error })
  }
}




const getMessages = async (req, res) => {
  try {
    const chatroom = await chatroomModel.findOne()
    if (!chatroom) {
      return res.status(200).json([])
    }

    res.json(chatroom.messages)
  } catch (error) {
    res.json({ message: "Error fetching messages", error })
  }
}




export { createChatroom, getChatrooms, sendMessage, getMessages }
