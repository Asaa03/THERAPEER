import React, { useContext, useEffect, useState, useRef } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { AppContext } from "../context/AppContext"
import axios from "axios"
import { toast } from "react-toastify"

const ChatBox = () => {
    const { appointmentId } = useParams()
    const { backendUrl, token, userData, loadUserProfileData } = useContext(AppContext)
    const [messages, setMessages] = useState([])
    const [message, setMessage] = useState("")
    const navigate = useNavigate()

    useEffect(() => {
        loadUserProfileData()
    }, [])

    const fetchMessages = async () => {
        try {
            const { data } = await axios.get(backendUrl + `/api/session/getMessage/${appointmentId}`, { headers: { token } })
            if (data.success) {
                setMessages(data.messages)
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        if (token && appointmentId) {
            fetchMessages()
        }
    }, [token, appointmentId])

    const sendMessage = async () => {
        if (!message.trim()) return
        try {
            const { data } = await axios.post( backendUrl + "/api/session/send",{ appointmentId, message }, { headers: { token } })
            if (data.success) {
                setMessage("")
                fetchMessages()
            }
        } catch (error) {
            console.log(error)
        }
    }

    const handleKeyDown = (event) => {
        if (event.key === "Enter") {
            event.preventDefault()
            sendMessage()
        }
    }

    if (!token) {
        navigate("/")
    }

    return (
        <div className="h-screen">
            <div className="max-w-5xl mx-auto p-6 bg-white shadow-md rounded-lg mt-8">
                <div className="h-[500px] overflow-y-auto border-b mb-4 p-3">
                    {messages.map((item, index) => {
                        const isMyMessage = item.senderId === userData?._id
                        return (
                            <div
                                key={index}
                                className={`p-2 my-1 rounded-md max-w-[60%] ${isMyMessage
                                    ? "ml-auto bg-primary text-white text-right w-fit px-4 py-2"
                                    : "mr-auto bg-primary text-white text-left w-fit px-4 py-2"
                                    }`}
                            >
                                {item.text}
                            </div>
                        )
                    })}
                </div>
                <div className="flex gap-2">
                    <input type="text" className="w-full p-2 border rounded" value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Type your message..." onKeyDown={handleKeyDown}/>
                    <button onClick={sendMessage} className="bg-primary text-white px-4 py-2 rounded"> Send</button>
                </div>
            </div>
        </div>



    )
}

export default ChatBox
