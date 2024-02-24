const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, 'Emri duhet shenuar']
    },
    lastName: {
        type: String,
        required: [true, 'Mbiemri duhet shenuar']
    },
    phone: {
        type: String,
        required: [true, 'Telefoni nuk duhet shenuar']
    },
    email: {
        type: String,
        required: [true, 'Email duhet shenuar']
    },
    website: {
        type: String,
    },
    address: {
        type: String,
        required: [true, 'Address duhet shenuar']
    },
    specialization: {
        type: String,
        required: [true, 'Specalizimi duhet shenuar']
    },
    expirience: {
        type: String,
        required: [true, 'Eksperienca duhet shenuar']
    },
    feesPerCunsaltation: {
        type: Number,
        required: [true, 'Fee duhet shenuar']
    },
    status: {
    type: String,
    default: 'pending'
    },
    timings: {
        type:Object,
        required: [true, 'Koha e punes duhet shenuar']
    },
},{timestamps:true}
)

const doctorModel = mongoose.model('doctors', doctorSchema)
module.exports = doctorModel