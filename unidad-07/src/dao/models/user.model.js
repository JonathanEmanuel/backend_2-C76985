import mongoose from 'mongoose'

const collection = 'Users';
const schema = new mongoose.Schema({
    name: String,
    email: String,
    role: String,
    orders: [
        {
            type: mongoose.SchemaType.ObjectId,
            ref: 'Orders'
        }
    ]
})

export default mongoose.model( collection, schema);