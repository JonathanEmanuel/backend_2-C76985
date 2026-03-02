import express from 'express'
import dotenv from 'dotenv'
dotenv.config();


import toysRouter from './routes/toys.router.js'
const PORT = process.env.PORT;
const MONGO_URI = process.env.MONGO_URI;
const SECRET_KEY = process.env.SECRET_KEY;

const app = express();
app.use( express.json());

// Rutas del usuario
app.use('/api/toys', toysRouter);



app.listen( PORT, () => {
    console.log(`Servidor Web con Express en el puerto ${PORT}`)
})