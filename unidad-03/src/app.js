import express from 'express'
import cookieParser from 'cookie-parser'
import session from 'express-session'
import FileStore from 'session-file-store'

import { connectMongo } from './config/db.js'
import usersRouter from './routes/users.router.js' 


const PORT = 4000;
const MONGO_URI = 'mongodb://localhost:27017/C76985';


connectMongo(MONGO_URI)

const app = express();
app.use( express.json());
app.use(  express.static('public') );

// Trabajamos con Cookies
const fileStorage = FileStore( session)
app.use( cookieParser('coders2026') );

app.use( session({
    store: new fileStorage({
        path: './sessions',
        ttl: 100,
        retries: 0
    }),
    secret: 'coders2026',
    resave: true,
    saveUninitialized: true
}))


app.get('/session', (req, res) => {
    if( req.session.count){
        req.session.count ++;
        console.log( req. session);
        res.send(`<h2>Esta es la visita tuya numero ${ req.session.count} </h2>`)
    } else {
        req.session.count = 1;
        res.send('Bienvenido Por Pimera vez 👋');
    }
})

app.get('/login', (req, res) => {
    const { user, password} = req.query
    // Harcodeamos el user y pass
    if(  user !== 'pepe' || password !== '123'){
        res.send('Usuario o contraseña invalidos')
    } else {
        req.session.user = user;
        req.session.role = 'admin';
        res.send('Ok')
    }
})

/*
app.post('/login', (req, res) => {
    const { user, password} = req.body
    // Harcodeamos el user y pass
    if(  user !== 'pepe' || password !== '123'){
        res.send('Usuario o contraseña invalidos')
    } else {
        req.session.user = user;
        req.session.role = 'admin';
        res.send('Ok')
    }
})
*/
app.get('/logout', (req, res) => {
    req.session.destroy(  error => {
        if( !error) {
            res.clearCookie('connect.sid');
            res.send('<h4> Logout </h4>');
        } else {
            console.error({ error});
            res.send('<h4> Tenemos un error 😒 </h4>');

        }
    })
})

// creamos un Middleware
const auth = (req, res, next) => {
    if( req.session?.user === 'pepe' && req.session?.role === 'admin'){
        return next()
    }else{
        res.status(401).send('<h4> Sin autorización </h4>');
    }
}

app.get('/dashboard', auth, ( req, res) => {
    res.send('<h4> Dashboard Admin </h4>')
})


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