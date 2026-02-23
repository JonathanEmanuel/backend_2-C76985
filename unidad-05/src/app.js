import express from 'express'
import cookieParser from 'cookie-parser'
import session from 'express-session'
import MongoStore from 'connect-mongo';

import dotenv from 'dotenv'
import { connectMongo } from './config/db.js'
import usersRouter from './routes/users.router.js'
import petsRouter from './routes/pets.router.js';
import ProductsRouter from './routes/products.router.js';
import { auth } from './middlewares/auth.js'
import passport from 'passport';
// import 'config/passport.config.js'

const productsRouter = new ProductsRouter();

dotenv.config();

const PORT = process.env.PORT;
const MONGO_URI = process.env.MONGO_URI;
const SECRET_KEY = process.env.SECRET_KEY;

connectMongo(MONGO_URI);

const app = express();
app.use( express.json());
app.use( express.urlencoded({ extended: true}));
app.use(  express.static('public') );

// app.use( passport.initialize());



app.get('/dashboard', auth, ( req, res) => {
    res.send('<h4> Dashboard Admin </h4>')
})



// Ruta de prueba
app.get('/api/dictionary/:word', (req, res) => {
    try {
        //const exp = /^[a-zA-Z]+$/;
        const exp = /^\p{L}+$/u;
        const param = req.params.word;

        if(  !exp.test( param) ){
            return res.status(400).json({status:'Error', msg: 'Caracteres invalidos'});
        }


        res.json({ status: 'ok', data: param})

    } catch (error) {
        console.error(error)
        res.status(500).json({ status: 'Error', msg: 'Error del servidor'})

    }
})



// Rutas del usuario
app.use('/api/users', usersRouter);
app.use('/api/pets', petsRouter);
app.use('/api/products', productsRouter.getRouter());

app.listen( PORT, () => {
    console.log(`Servidor Web con Express en el puerto ${PORT}`)
})