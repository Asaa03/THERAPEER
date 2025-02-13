import { Link } from "react-router-dom"

const Home = () => {
  return (
    <div className="min-h-screen">
      <section className=" max-w-7xl mx-auto text-center py-20 px-10 bg-primary text-white">
        <h2 className="text-4xl font-bold">Your Mental Well-being Matters</h2>
        <p className="text-lg mt-4 max-w-xl mx-auto">
          Find comfort in conversations. Get professional support anytime, anywhere.
        </p>
        <Link to={'/signup'} >
        <button className="bg-white text-primary px-6 py-3 mt-6 rounded-md shadow-lg hover:bg-gray-200">
          Start Your Journey
        </button>
        </Link>
      </section>

      <section className="py-20 px-10">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-gray-800 mb-6">
            Our Services
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white shadow-lg p-6 rounded-lg">
              <h3 className="text-xl font-semibold">Public Chatrooms</h3>
              <p className="text-gray-600 mt-2">Join discussions and connect with others.</p>
            </div>
            <div className="bg-white shadow-lg p-6 rounded-lg">
              <h3 className="text-xl font-semibold">Easy Appointments</h3>
              <p className="text-gray-600 mt-2">Book therapy sessions in minutes.</p>
            </div>
            <div className="bg-white shadow-lg p-6 rounded-lg">
              <h3 className="text-xl font-semibold">Public Chatrooms</h3>
              <p className="text-gray-600 mt-2">One-on-one secure therapy with professionals</p>
            </div>
          </div>
        </div>
      </section>


    </div>
  )
}

export default Home
