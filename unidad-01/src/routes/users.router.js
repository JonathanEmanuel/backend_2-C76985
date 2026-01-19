import { Router } from "express";
import { UserModel } from "../models/user.model.js"

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
router.post('/', async (req, res) => {

    try {
        const { name, email, age } = req.body;
        // Validar campos
        const result = await UserModel.create({name, email, age});
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