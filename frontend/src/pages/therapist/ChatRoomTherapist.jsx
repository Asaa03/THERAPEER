import React, { useEffect, useContext, useRef, useState } from "react"
import { useNavigate } from "react-router-dom"
import { TherapistContext } from "../../context/TherapistContext"
import { toast } from "react-toastify"
import axios from "axios"

const ChatroomTherapist = () => {
  const [messages, setMessages] = useState([])
  const [message, setMessage] = useState('')
  const { tToken, backendUrl, profileData, getProfileData } = useContext(TherapistContext)
  const navigate = useNavigate()

  const getMessages = async () => {
    try {
      const response = await axios.get(backendUrl + '/api/chatroom/messages', { headers: { tToken } })
      if (response.data) {
        setMessages(response.data)
      } else {
        toast.error(response.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  const sendMessage = async () => {
    if (!message) return
    try {
      const { data } = await axios.post(backendUrl + '/api/chatroom/message', { message }, { headers: { tToken } })

      if (data.message === "Message sent") {
        setMessages(prevMessages => [...prevMessages, { message }])
        setMessage('')
      }
    } catch (error) {
      toast.error(error.message)
    }
  }


   useEffect(() => {
      if (tToken) {
       getMessages()
       const interval = setInterval(getMessages, 3000)
       return () => clearInterval(interval)
     }else{
      navigate('/')
     }
   }, [tToken])

  useEffect(() => {
    getProfileData()
  }, [])

  const handleSendMessage = async () => {
    if (!message.trim()) return
    await sendMessage()
    setMessage('')
    getMessages()
  }


  const handleKeyPress = (e) => {
    if (e.key === "Enter" && message.trim()) {
      handleSendMessage()
    }
  }

  if (!tToken) {
    navigate('/')
  }

  return (
    <div className="max-w-4xl mx-auto m-6 p-6 bg-white shadow-md rounded-lg">
      <div className="h-[500px] overflow-y-auto border-b mb-4 p-3">
        {Array.isArray(messages) ? (
          messages.map((item, index) => {
            const isMyMessage =
              (item.senderUser && item.senderUser === profileData?._id) ||
              (item.senderTherapist && item.senderTherapist === profileData?._id)
            return (
              <div
                key={index}
                className={`p-2 my-1 rounded-md max-w-[60%] ${isMyMessage
                    ? "ml-auto bg-primary text-white text-right w-fit px-4 py-2"
                    : "mr-auto bg-primary text-white text-left w-fit px-4 py-2"
                  }`}
              >
                {item.message}
              </div>
            )
          })
        ) : (
          <p>No messages found</p>
        )}
      </div>

      <div className="flex gap-2">
        <input type="text" value={message} onChange={(e) => setMessage(e.target.value)} onKeyDown={handleKeyPress} placeholder="Type a message..." className="flex-grow p-2 border border-gray-300 rounded-l-md focus:outline-none"/>
        <button onClick={handleSendMessage} className="bg-primary text-white px-4 py-2 rounded-r-md">Send</button>
      </div>
    </div>

  )
}

export default ChatroomTherapist
