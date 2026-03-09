// Importamos el service

// Creamos la instancia


export const getOrders = async( req, res) => {
    res.send( { status: 'success', payload: 'Lista de Ordenes'})
}

export const getByIdOrder = async( req, res) => {
    res.send( { status: 'success', payload: 'Ordenes por ID'})
}

export const saveOrder = async( req, res) => {
    res.send( { status: 'success', payload: 'orden guardado'})
}

export const deleteOrder = async( req, res) => {
    res.send( { status: 'success', payload: 'Ordenes eliminado por ID'})
}