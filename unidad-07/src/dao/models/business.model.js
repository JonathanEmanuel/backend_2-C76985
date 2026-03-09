import mongoose from 'mongoose'

const collection = 'Business'
const schema = new mongoose.Schema({
    name: String,
    products: []
})

export default mongoose.model(collection, schema);