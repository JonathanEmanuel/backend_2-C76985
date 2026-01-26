import express from 'express'
import cookieParser from 'cookie-parser'

import { connectMongo } from './config/db.js'
import usersRouter from './routes/users.router.js' 


const PORT = 4000;
const MONGO_URI = 'mongodb://localhost:27017/C76985';


connectMongo(MONGO_URI)

const app = express();
app.use( express.json());
app.use(  express.static('public') );

// Trabajamos con Cookies
app.use( cookieParser('coders2026') );

app.get('/setcookie', (req, res) => {  // Guardamos la cookie
    res.cookie('CookieCoder', 'CookieUser').send('Cookie Creada');
})

app.get('/getcookie', ( req, res) => {  // Obtenemos la cookie
    res.send( req.cookies);
})

app.get('/deletecookie', (req, res) => {  // Eliminamos la cookie
    res.clearCookie('CookieCoder').send('Cookie Eliminada')
})



// Rutas del usuario
app.use('/api/users', usersRouter);


app.listen( PORT, () => {
    console.log(`Servidor Web con Express en el puerto ${PORT}`)
})