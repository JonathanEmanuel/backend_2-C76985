// Importamos el service

// Creamos la instancia


export const getUsers = async( req, res) => {
    res.send( { status: 'success', payload: 'Lista de usuarios'})
}

export const getByIdUser = async( req, res) => {
    res.send( { status: 'success', payload: 'Usuarios por ID'})
}

export const saveUser = async( req, res) => {
    res.send( { status: 'success', payload: 'usuario guardado'})
}

export const deleteUser = async( req, res) => {
    res.send( { status: 'success', payload: 'Usuarios eliminado por ID'})
}