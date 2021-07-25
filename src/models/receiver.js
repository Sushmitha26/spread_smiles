const mongoose = require('mongoose')

const foodReceiverSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true
    },
    email: {
        type: String,
        trim: true,
        required: true
    },
    phone: {
        type: String,
        trim: true,
        required: true
    },
    address: {
        type: String,
        trim: true,
        required: true
    },

    receiverType: {
        type: String,
        required: true
    },
    people: {
        type: Number,
        required: true
    },
    canReceive: {
        type: Boolean,
        default: false
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'FoodDonor'
    }
}, {
    timestamps: true
})

const FoodReceiver = mongoose.model('FoodReceiver', foodReceiverSchema)


const medicineReceiverSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true
    },
    email: {
        type: String,
        trim: true,
        required: true
    },
    phone: {
        type: String,
        trim: true,
        required: true
    },
    ngoname: {
        type: String,
        trim: true,
        required: true
    },
    address: {
        type: String,
        trim: true,
        required: true
    }
}, {
    timestamps: true
})

const MedicineReceiver = mongoose.model('MedicineReceiver', medicineReceiverSchema)

module.exports = {
    FoodReceiver,
    MedicineReceiver
}