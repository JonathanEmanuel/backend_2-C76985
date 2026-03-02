import { Router } from "express";
import { jwt} from 'jsonwebtoken';

const SECRET_KEY = 'claveSecreta-ejemplo'; // Debe ser una variable de entorno

export default class CustomRouter {

    constructor() {
        this.router = Router();
        this.init();
    }

    getRouter(){
        return this.router;
    }

    init(){  // En este méthodo las clases hijas definen sus rutas

    }
    // Politicas
    handlePolices = ( polices ) => (req, res, next) => {
        // Si es PUBLIC Cualquiera puede entrar
        if( polices === 'PUBLIC') {
            return next();
        }

        // Si no Extraemo el token de los header de Autorización
        const authHeaders = req.headers.authorization;
        if( !authHeaders){
            return res.status(401).json({
                status: 'error',
                msg: 'Sin autorización'
            })
        }
        // Extraemos el jwt 'Bearer <jwt>'
        const token = authHeaders.split(' ')[1];
        try {
            let user = jwt.vefify(token, SECRET_KEY);
            let rol = user.role.toUpperCase()
            if( ! polices.includes( rol) ){
                return res.status(403).json({
                    status: 'error',
                    msg: 'Acceso no permitido'
                })
            }
            req.user = user;
            next();

        } catch (error) {
            console.error(error);
            res.status(500).json({
                status: 'error',
                msg: 'Error del Servidor'
            })
        }

    }


    applyCallbacks(callbacks ){
        return callbacks.map(  callback => async (...params) => {
            try {
                const [ req, res, next] = params;
                await callback( req, res, next)
            } catch (error) {
                console.log(error);
                params[1].status(500).json({
                    status: 'Error',
                    msg: 'Error del servidor'
                })
            }
        } )
    }
    // Custom Response
    generateCustomResponse(req, res, next){
        res.sendSuccess = payload => res.json( {status: 'success', payload });
        res.sendServerError = payload => res.status(500).json( {status: 'error', error });
        res.sendUserError = payload => res.status(400).json( {status: 'error', error });
        next();
    } 

    get(path, ...callbacks){
        this.router.get(path, this.generateCustomResponse,  this.applyCallbacks(callbacks));
    }
    post() { this.router.post(path, this.generateCustomResponse,  this.applyCallbacks(callbacks)) }

    put() { this.router.put(path, this.generateCustomResponse,  this.applyCallbacks(callbacks))}
    delete(){this.router.delete(path, this.generateCustomResponse,  this.applyCallbacks(callbacks))}
}