import chatModel from "../models/chatModel.js"

const getsessionMessages = async (req, res) => {
  try {
    const chat = await chatModel.findOne({ appointmentId: req.params.appointmentId })
    if (!chat) {
      return res.json({ success: false, error: "No messages found" })
    }
    res.json({ success: true, messages: chat.messages })
  } catch (error) {
    res.json({ success: false,message:error})
  }
}

const sendsessionMessage = async (req, res) => {
  try {
    const { appointmentId, message, userId, therapistId } = req.body

    if (!message.trim()) {
      return res.json({ success: false, message: "Message cannot be empty" })
    }
    const senderId = therapistId || userId
    const senderType = therapistId ? "Therapist" : "User"
    let chat = await chatModel.findOne({ appointmentId })
    if (!chat) {
      chat = await chatModel.create({ appointmentId, messages: [] })
    }
    chat.messages.push({ senderId, senderType, text: message, timestamp: new Date(), })
    await chat.save()
    res.json({ success: true,chat })
  } catch (error) {
    console.log(error.message)
    res.json({ success: false,message:error })
  }
}

export { getsessionMessages, sendsessionMessage }
