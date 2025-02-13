import mongoose from 'mongoose'

const connectDB = async(req,res)=>{

    mongoose.connection.on('connected',()=>console.log('Database Connected'))

    await mongoose.connect(`${process.env.MONGODB_URI}/Therapeer`)
}

export default connectDB