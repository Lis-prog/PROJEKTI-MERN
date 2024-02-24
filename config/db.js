const mongoose = require('mongoose')
const colors = require('colors')


const connectDB = async() => {
    try {
        await mongoose.connect(process.env.MONGO_URL)
        console.log(`MongoDB konektuar ${mongoose.connection.host}`.bgGreen.white )
    }
    catch(error) {
        console.log(`MongoDB Serveri ka problem ${error}` .bgRed.white)
    }
}

module.exports = connectDB;