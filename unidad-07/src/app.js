import express from 'express'
import cors from 'cors'
// importamos las rutas
import usersRoture from './routes/users.router.js'
import businessRoture from './routes/business.router.js'
import ordersRoture from './routes/orders.router.js'


const PORT = 5000;

const app = express();
app.use( cors());
// Definimos las rutas
app.use('/api/users', usersRoture);
app.use('/api/orders', ordersRoture);
app.use('/api/business', businessRoture);



app.listen( PORT, () => console.log(`Servidor con Express en el puerto ${PORT}`));