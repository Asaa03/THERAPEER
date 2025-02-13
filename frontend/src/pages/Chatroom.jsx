import React, { useEffect, useContext, useRef, useState } from "react"
import { AppContext } from "../context/AppContext"
import { toast } from "react-toastify"
import axios from "axios"
import { useNavigate } from "react-router-dom"

const ChatroomTherapist = () => {

  const [messages, setMessages] = useState([])
  const [message, setMessage] = useState('')
  const { userData, token, backendUrl, loadUserProfileData } = useContext(AppContext)
  const navigate = useNavigate()

  useEffect(() => {
    loadUserProfileData()
  }, [])

  const getMessages = async () => {
    try {
      const response = await axios.get(backendUrl + '/api/chatroom/messages', { headers: { token } })
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
      const { data } = await axios.post(backendUrl + '/api/chatroom/message', { message }, { headers: { token } })

      if (data.message === "Message sent") {
        setMessages(prevMessages => [...prevMessages, { message }])
        setMessage('')
      }
    } catch (error) {
      toast.error(error.message)
    }
  }


  useEffect(() => {
    if (token) {
      getMessages()
      const interval = setInterval(getMessages, 3000)
      return () => clearInterval(interval)
    }else{
      navigate('/')
    }
  }, [token])


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

  return (
    <div className="h-screen">
      <div className="max-w-5xl mx-auto p-6 bg-white shadow-md rounded-lg mt-8">
        <div className="h-[500px] overflow-y-auto border-b mb-4 p-3" >
          {Array.isArray(messages) ? (
            messages.map((item, index) => {
              const isMyMessage =
                (item.senderUser && item.senderUser === userData?._id) ||
                (item.senderTherapist && item.senderTherapist === userData?._id)

              return (
                <div
                  key={index}
                  className={`p-2 my-1 rounded-md max-w-[60%] ${isMyMessage
                    ? "ml-auto bg-blue-500 text-white text-right w-fit px-4 py-2"
                    : "mr-auto bg-blue-500 text-white text-left w-fit px-4 py-2"
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

        <div className="flex gap-2 mt-4">
          <input type="text" value={message} onChange={(e) => setMessage(e.target.value)} onKeyDown={handleKeyPress} placeholder="Type a message..." className="w-full p-3 border border-gray-300 rounded-l-md focus:outline-none" />
          <button onClick={handleSendMessage} className="bg-primary text-white px-4 py-3 rounded-r-md" > Send </button>
        </div>
      </div>
    </div>

  )
}

export default ChatroomTherapist
