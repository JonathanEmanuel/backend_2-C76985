const tbody = document.querySelector('#trow');
const form = document.querySelector('form');
const inputName = document.querySelector('#name');
const inputPrice = document.querySelector('#price');


const URL_API = 'http://127.0.0.1:4000/api';
// GET
const getToys = async () => {
    try {
        const resp = await fetch(URL_API + '/toys');
        console.log( resp);
        const data = await resp.json();
        console.log(data);
        renderToys(data.payload);

    } catch (error) {
        console.error(error);
        alert('Error');
    }
}

const renderToys = ( toys) => {
    tbody.innerHTML = ''
        toys.forEach(toy => {
            tbody.innerHTML += ` <tr>
                                    <td>${toy.name}</td>
                                    <td>${toy.price}</td>
                                </tr>`
        });
}


// POST
form.addEventListener('submit', async (e) =>{
    e.preventDefault();
    const name = inputName.value;
    const price = inputPrice.value;

    const data = { name, price};
    const resp = await fetch(URL_API + '/toys', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
    
    const result = await resp.json();
    console.log(result)

    getToys();

})
getToys();