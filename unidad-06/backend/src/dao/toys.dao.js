class ToysDato {
    constructor(){
        this.toys = [
            {
        "name": "Auto1",
        "price": 12400
        }
    ];
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