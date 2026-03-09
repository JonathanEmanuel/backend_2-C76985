import mongoose from 'mongoose'

const collection = 'Orders'
const schema = new mongoose.Schema({
    numbre: Number,
    business: {
        type: mongoose.Schema.ObjectId,
        ref: 'Business'
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'Users'
    },
    products: [],
    totalPrice: Number
})

export default mongoose.model( collection, schema );