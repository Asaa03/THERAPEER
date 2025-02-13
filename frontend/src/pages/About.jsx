import React from 'react'
import AboutUs from '../assets/AboutUs.jpg'

const About = () => {
  return (
    <div className="px-6 sm:px-10 lg:px-20 py-12 text-gray-600 h-screen">
      <div className='max-w-7xl m-auto'>
        <div className="text-center text-2xl font-semibold text-gray-700">
        <p>ABOUT <span className="text-primary">US</span></p>
      </div>

      <div className="my-12 flex flex-col md:flex-row gap-10 items-center">
        <img className="w-full max-w-[500px] rounded-lg shadow-lg" src={AboutUs} alt="About Us" />
        <div className="md:w-2/3 flex flex-col gap-5">
          <p>
            <b className="text-gray-800">Therapeer</b> is an online mental health platform dedicated to making textual therapy accessible, affordable, and effective for everyone. We provide a secure space where individuals can connect with professional therapists, engage in public discussions, and receive support through private text-based therapy sessions.
          </p>
          <b className="text-gray-800">Our Mission</b>
          <p>
            Our mission at <b className="text-gray-800">Therapeer</b> is to bridge the gap between individuals seeking mental health support and professional therapists. We believe that everyone deserves access to quality mental health care, regardless of location or financial status.
          </p>
        </div>
      </div>
      </div>
      
    </div>
  )
}

export default About
