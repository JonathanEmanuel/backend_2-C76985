import { Router } from "express";

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