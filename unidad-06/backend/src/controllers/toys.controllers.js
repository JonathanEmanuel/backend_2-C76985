import ToysService from "../services/toys.service.js";

const toyService = new ToysService();

export const getToys = ( req, res) => {
    const result = toyService.getToys();

    res.json({
        status: 'success',
        payload: result
    })
}

export const saveToy = ( req, res) => {
    const toy = req.body;
    // Validamos datos
    if( !toy.name || !toy.price ){
        return res.json({
            status: 'error',
            msg: 'Faltn campos obligatorios'
        })
    }
    const result = toyService.createToy(toy);
    res.json({
        status: 'success',
        payload: result
    })
}