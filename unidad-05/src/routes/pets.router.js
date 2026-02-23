import { Router } from "express";

const router = Router();

const pets = [
    { name: 'Laila Do', specie: 'dog'},
    { name: 'Kitty', specie: 'cat'}
]

router.param('pet', (req, res, next, petName) => {
    try {
        const exp = /^[a-zA-Z]+$/;
        if( !exp.test( petName) ){
            return res.status(400).json({status:'Error', msg: 'Caracteres invalidos'});
        }

        res.json({ status: 'ok', data: petName})



    } catch (error) {
        console.error(error)
        res.status(500).json({ status: 'Error', msg: 'Error del servidor'});
    }

    next();

})


router.get('/:name', (req, res) => {
    try {
        // const exp = /^[a-zA-Z]+$/;
        const exp = /^[A-Za-z]+(?: [A-Za-z]+)*$/;

        const name = req.params.name;

        if(  !exp.test( name) ){
            return res.status(400).json({status:'Error', msg: 'Nombre invalido'});
        }

        const normalized = name.toLowerCase();

        const pet = pets.find( p => p.name.toLowerCase() === normalized );

        if( !pet){
           return res.status(401).json({ stauts: 'Error', msg: 'No se encontro la mascota'});
        }



        res.json({ status: 'ok', data: pet})

    } catch (error) {
        console.error(error)
        res.status(500).json({ status: 'Error', msg: 'Error del servidor'})

    }
})



router.post('/', (req, res) => {
    const { name, specie} = req.body;

    if( !name || !specie ){
        return res.status(400).json({ status: 'Error', msg: 'No se pasaron los parámetros obligatorios'});
    }

    pets.push({ name, specie});
    res.status(201).json({ status: 'ok', data: pets})
})

router.get('/', (req, res) => {
    res.status(201).json({ status: 'ok', data: pets})
})

export default router;