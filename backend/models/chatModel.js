import mongoose from "mongoose";

const chatSchema = new mongoose.Schema({
      appointmentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Appointment', required: true},
      messages: [{
        senderId: {type: mongoose.Schema.Types.ObjectId, refPath: "senderType", required: true},
        senderType: {type: String, enum: ["User", "Therapist"], required: true},
        text: {type: String, required: true},
        timestamp: {type: Date, default: Date.now}
      }]
},{ timestamps: true })
  

const chatModel = mongoose.models.chat || mongoose.model('chat', chatSchema);

export default chatModel;
