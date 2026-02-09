import { Router } from "express";
import { UserModel } from "../models/user.model.js"
import { createHash, isValidPassword} from '../utils/crypto.js'

const router = Router();


// GET para obtener recursos
router.get('/', async (req, res) => {
    try {
        const result = await UserModel.find();
        res.json({
            status: 'success',
            payload: result
        });

    } catch (error) {
        res.status(500).json({
            status: 'error',
            messege: error.messege
        });
    }

})
// [ POST ] Crea un Recurso
router.post('/register', async (req, res) => {

    try {
        const { name, email, password, age } = req.body;
        // Validar campos --> Luego los validamos

        const exists = await UserModel.findOne({ email });
        if( exists) {
            return  res.status(409).json( { status: 'error', error: 'El email ya está registrado'});
        }
        
        const hashed = await createHash(password);

        const user = await UserModel.create({name, email, password: hashed, age});
        const result = {
            _id: user._id,
            email: user.email
        }
        res.json({
            status: 'success',
            payload: result
        });
        console.log('Usuario Registrado ', result);
    } catch (error) {
        console.error('No se pudo crear el recurso (usuario)', error)
        res.status(400).json({
            status: 'error',
            messege: error.messege
        });
    }

})

router.post('/login', async (req, res) => {
     try {
        const { email, password } = req.body;
        // Validar campos --> Luego los validamos

        const user = await UserModel.findOne({ email });
        if( !user) {
            return  res.status(401).json( { status: 'error', error: 'El email no existe'});
        }
        // Verificamos el password
        const ok = await isValidPassword(password, user.password);
        if( !ok) {
            return  res.status(401).json( { status: 'error', error: 'Contraseña Invalida'});
        }


        res.json({
            status: 'success',
            massage: 'Credenciales correctas'
        });

    } catch (error) {
        console.error('No se pudo realizar el login', error)
        res.status(400).json({
            status: 'error',
            messege: error.messege
        });
    }
})

// [ PUT ] Actualiza un Recurso
router.put('/:uid', async (req, res) => {
    const uid = req.params.uid;
    const { name, email, age } = req.body;

    try {
        const user = await UserModel.findOne({_id, uid});
        if( !user) {
            res.status(401).json({
                status:'error',
                messege: 'No existe el usuario'
            })
        }

        const newUser = {
            name: name ?? user.name,
            email: email ?? user.email,
            age: age ?? user.age
        }

        const result = await UserModel.updateOne({_id: uid}, newUser)
        res.json({
            status: 'success',
            payload: result
        });

    } catch (error) {
        res.status(500).json({
            status: 'error',
            messege: error.messege
        });
    }
})
// [ DELETE ] Elimina un Recurso
router.delete('/:uid', async (req, res) => {
    const uid = req.params.uid;

     try {
        const result = await UserModel.deleteOne({_id: uid})
        res.json({
            status: 'success',
            payload: result
        });

    } catch (error) {
        res.status(500).json({
            status: 'error',
            messege: error.messege
        });
    }
})

export default router;