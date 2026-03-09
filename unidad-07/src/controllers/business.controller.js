// Importamos el service
import Business from "../dao/classes/business.dao.js"
// Creamos la instancia
const businessService = new Business();

export const getBusiness = async( req, res) => {
    const result = await businessService.getBusiness();
    // Manejar errores
    res.send( { status: 'success', payload: result})
}

export const getByIdBusines = async( req, res) => {
    const { id } = req.params;

    const result = await businessService.getBusinessById(id);
    
    res.send( { status: 'success', payload: result} )
}

export const saveBusines = async( req, res) => {
    const business = req.body;
    // Agregar validaciones
    const result = await businessService.saveBusiness( business);

    if( !result) res.status(500).send( { status: 'Error', payload: {}});
    res.send( { status: 'success', payload: result})
}

export const deleteBusines = async( req, res) => {
    res.send( { status: 'success', payload: 'Negocios eliminado por ID'})
}

export const addProduct =  async(req, res) => {
    // Agregar validaciones
    const product = req.body;
    const { id } = req.params;
    const business = await businessService.getBusinessById( id );
    business.product.push( product);

    await businessService.updateBusiness( id, business);
    
    if( !result) {
        return res.status(500).send( { status: 'Error', payload: {}});
    }

    res.send( { status: 'success', payload: 'Producto agregado'})
}