const mongoose = require('mongoose')
require('dotenv').config()

const MONGOOSE_URL = process.env.MONGOOSE_URL

const connectToDb = ()=>{
    mongoose.connect(MONGOOSE_URL)
    mongoose.connection.on('connected', ()=>{
        console.log("connected to MongoDb successfully")
    })
    mongoose.connection.on('error', ()=>{
        console.log("An error occurred", error)
    })
}

module.exports = connectToDb