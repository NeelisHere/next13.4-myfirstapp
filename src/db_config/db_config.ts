import mongoose from "mongoose";

const connect = async () => {
    try {
        mongoose.connect(process.env.MONGO_URI!)
        const connection = mongoose.connection
        connection.on('connected', () => {
            console.log('MongoDB connection established.')
        })
        connection.on('error', (err) => {
            console.log('mongodb connection error ' + err)
            process.exit()
        })
    } catch (error) {
        console.log('Failed to connect')
        console.log(error)
    }
}

export default connect