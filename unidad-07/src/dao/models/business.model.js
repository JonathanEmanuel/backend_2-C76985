import mongosse from 'mongoose'

const collection = 'Business'
const schema = new mongosse.Schema({
    name: String,
    products: []
})

export default mongosse.model(collection, schema);