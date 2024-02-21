const express = require('express')
const colors = require('colors')
const moragan = require('morgan')
const dotnev = require('dotenv')
const connectDB = require('./config/db')

// config i dotenv
dotnev.config()

//mongo db konektimi
connectDB();

const app = express();

// Middlewaret
app.use(express.json())
app.use(moragan('dev'))

// Rotuerat
app.use("/api/v1/user", require("./routes/userRoutes"))

// Porti Serverit
const port = process.env.PORT || 8080;
//
app.listen(port, () => {
    console.log(`Serveri eshte duke startuar ne ${process.env.NODE_MODE} ne portin ${process.env.PORT}`
    .bgCyan.white)
})
