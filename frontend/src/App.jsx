import React, { useContext } from "react";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { AdminContext } from "./context/AdminContext.jsx";
import SignUp from "./pages/SignUp.jsx";
import AdminLayout from "./layouts/AdminLayout.jsx";
import Dashboard from "./pages/admin/Dashboard.jsx";
import AllAppointments from "./pages/admin/AllAppointments.jsx";
import AddTherapist from "./pages/admin/AddTherapist.jsx";
import TherapistsList from "./pages/admin/TherapistsList.jsx";
import Home from "./pages/Home.jsx";
import Login from './pages/Login.jsx'
import UserLayout from "./layouts/UserLayout";
import Footer from "./components/Footer.jsx";
import Therapists from "./pages/therapist.jsx";
import Appointment from "./pages/Appointment.jsx";
import MyAppointments from "./pages/MyAppointments.jsx";
import MyProfile from "./pages/MyProfile.jsx";
import About from "./pages/About.jsx";
import { TherapistContext } from "./context/TherapistContext.jsx";
import TherapistLayout from "./layouts/TherapistLayout.jsx";
import TherapistDashboard from "./pages/therapist/TherapistDashboard.jsx";
import TherapistAppointments from "./pages/therapist/TherapistAppointments.jsx";
import Profile from "./pages/therapist/Profile.jsx";
import Chatroom from "./pages/Chatroom.jsx";
import ChatroomTherapist from "./pages/therapist/ChatRoomTherapist.jsx";
import ChatBox from "./pages/ChatBox.jsx";
import SessionTherapist from "./pages/therapist/sessionTherapist.jsx";

const App = () => {
  const { aToken } = useContext(AdminContext);
  const {tToken} = useContext(TherapistContext)

  return (
    <>
      <ToastContainer />

      <Routes>
        <Route path="/" element={<UserLayout />}>
          <Route index element={<Home />} />
          <Route path="signup" element={<SignUp />} />
          <Route path='login' element = {<Login/>}/>
          <Route path ='therapists' element ={<Therapists />}/>
          <Route path ='about' element ={<About />}/>
          <Route path ='my-profile' element ={<MyProfile />}/>
          <Route path ='therapists/:speciality' element ={<Therapists />}/>
          <Route path ='appointment/:therapistId' element ={<Appointment />}/>
          <Route path ='my-appointments' element ={<MyAppointments />}/>
          <Route path ='chatroom' element={<Chatroom />} />
          <Route path ='chat/:appointmentId' element={<ChatBox />} />
        </Route>

        {aToken ? (
          <Route path="/admin" element={<AdminLayout />}>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="all-appointments" element={<AllAppointments />} />
            <Route path="add-therapist" element={<AddTherapist />} />
            <Route path="therapist-list" element={<TherapistsList />} />
          </Route>
        ) : (
          <Route path="/login" element={<Login />} />
        )}

        {tToken ? (
          <Route path="/therapist" element={<TherapistLayout/>} >
            <Route path="therapist-dashboard" element={<TherapistDashboard />} />
            <Route path ="therapist-appointments" element={<TherapistAppointments />} />
            <Route path='session/:appointmentId' element={<SessionTherapist />} />
            <Route path="therapist-profile" element={<Profile />} />
            <Route path ='therapist-chatroom' element={<ChatroomTherapist />} />
          </Route>
        ) : (
          <Route path="/login" element={<Login />} /> 
        )}
      </Routes>
      <Footer />
    </>
  );
};

export default App;
