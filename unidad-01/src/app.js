import express from 'express'
import { connectMongo } from './config/db.js'
import usersRouter from './routes/users.router.js' 

const PORT = 4000;
const MONGO_URI = 'mongodb+srv://jonathancruz:U44PMYCVikHTSYEq@cluster0.sy56ogm.mongodb.net/?appName=Cluster0';

connectMongo(MONGO_URI)

const app = express();
app.use( express.json());

app.use(  express.static('public') );

// Rutas del usuario
app.use('/api/users', usersRouter);


app.listen( PORT, () => {
    console.log(`Servidor Web con Express en el puerto ${PORT}`)
})