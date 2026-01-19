import { Router } from "express";

const router = Router();


// GET para obtener recursos
router.get('/', (request, response) => {
    response.send('<h1> Listado de usuarios </h1>');
})
// [ POST ] Crea un Recurso
router.post('/', (req, res) => {
    res.send('<h1> Registro de usuario </h1>');
})

// [ PUT ] Actualiza un Recurso
router.post('/', (req, res) => {
    res.send('<h1> Usuario Actualizado </h1>');
})
// [ DELETE ] Elimina un Recurso
router.delete('/', (req, res) => {
    res.send('<h1> Eliminado usuario </h1>');
})

export default router;