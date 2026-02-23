import CustomRouter from "./Router.js";

export default class ProductsRouter extends CustomRouter {
    init(){  // Redefinimos el method
        this.get('/', (req, res) => {
            // res.json({ status:'ok', msg: 'Lista de Productos!'})
            res.sendSuccess('Lista de productos');
        })
    }
}

