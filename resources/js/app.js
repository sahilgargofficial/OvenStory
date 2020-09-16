// Client js Code
import axios from 'axios';
import Noty from 'noty'

const addToCart = document.querySelectorAll('.add-to-cart');
const cartCounter = document.querySelector('#cartCounter');

function updateCart(pizza) {
    axios.post('/update-cart', pizza).then(res => {
        cartCounter.innerText = res.data.totalQty;
        new Noty({
            type: "success",
            timeout: 1000,
            text: "item added to cart",
            progressBar: false,
        }).show()
    }).catch(err =>{
        new Noty({
            type: "error",
            timeout: 1000,
            text: "something went wrong",
            progressBar: false,
        }).show()
    })
}

addToCart.forEach(btn => {
    btn.addEventListener('click', async () => {
        let pizza = JSON.parse(btn.dataset.pizza);
        await updateCart(pizza);
    })
})