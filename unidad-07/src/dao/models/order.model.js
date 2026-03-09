import mongosse from 'mongoose'

const collection = 'Orders'
const schema = new mongosse.Schema({
    numbre: Number,
    business: {
        type: mongosse.Schema.ObjectId,
        ref: 'Business'
    },
    user: {
        type: mongosse.Schema.ObjectId,
        ref: 'Users'
    },
    products: [],
    totalPrice: Number
})

export default mongosse.model( collection, schema );