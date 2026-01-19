import mongoose from 'mongoose'

export const connectMongo = async (uri) => {
    try {
        await mongoose.connect(uri);
        console.log('Conectado con mongoDB');
    } catch (error) {
        console.error('No se pudo conectar con la MongoDB')
    }

}