import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
    message: { type: String, required: true },
    senderUser: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    senderTherapist: { type: mongoose.Schema.Types.ObjectId, ref: 'Therapist' },
    timestamp: { type: Date, default: Date.now }      
});

const chatroomSchema = new mongoose.Schema({
    messages: [messageSchema]
});

const chatroomModel = mongoose.models.chatroom || mongoose.model('chatroom', chatroomSchema);

export default chatroomModel;
