const express = require('express')
const colors = require('colors')
const moragan = require('morgan')
const dotnev = require('dotenv')

// config i dotenv
dotnev.config()

const app = express();

// Middlewaret
app.use(express.json())
app.use(moragan('dev'))

// Rotuerat
app.get('/', (req, res) => {
    res.status(200).send({
        message: "server running",
    });
});

// Porti Serverit
const port = process.env.PORT || 8080;
//
app.listen(port, () => {
    console.log(`Serveri eshte duke startuar ne ${process.env.NODE_MODE} ne portin ${process.env.PORT}`
    .bgCyan.white)
})
