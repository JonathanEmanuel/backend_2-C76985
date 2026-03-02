import ToysDato from "../dao/toys.dao.js";

export default class ToysService {
    constructor(){
        this.dao = new ToysDato();
    }
    getToys = () => {
        return this.dao.getAll();
    }

    createToy = ( toy ) => {
        this.dao.save( toy );
    }

    deleteToy = () => { }
}