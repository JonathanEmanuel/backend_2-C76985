// Importamos el service

// Creamos la instancia


export const getBusiness = async( req, res) => {
    res.send( { status: 'success', payload: 'Lista de Negocios'})
}

export const getByIdBusines = async( req, res) => {
    res.send( { status: 'success', payload: 'Negocios por ID'})
}

export const saveBusines = async( req, res) => {
    res.send( { status: 'success', payload: 'Negocio guardado'})
}

export const deleteBusines = async( req, res) => {
    res.send( { status: 'success', payload: 'Negocios eliminado por ID'})
}

export const addProduct =  async(req, res) => {
    res.send( { status: 'success', payload: 'Producto agregado'})
}