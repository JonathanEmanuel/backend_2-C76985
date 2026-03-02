class ToysDato {
    constructor(){
        this.toys = [];
    }
    getAll = () => {
        return this.toys;
    }
    save = ( toy) => {
        this.toys.push( toy );
        return toy;
    }
}

export default ToysDato;