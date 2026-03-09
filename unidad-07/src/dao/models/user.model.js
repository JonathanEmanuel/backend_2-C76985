import mongosse from 'mongoose'

const collection = 'Users'
const schema = new mongosse.Schema({
    name: String,
    emai: {
        type: String,
        required: true
    },
    role: String,
    orders: [
        {
            type: mongosse.SchemaType.ObjectId,
            ref: 'Orders'
        }
    ]
})

export default mongosse.model( collection, schema);