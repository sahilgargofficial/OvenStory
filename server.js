const express = require('express')
const app = express();
const PORT = process.env.port || 3000;
const path = require('path')
const ejs = require('ejs');
const expressLayouts = require('express-ejs-layouts');

// set templating engine
app.use(expressLayouts);
app.set('views', path.join(__dirname, '/resources/views'))
app.set('view engine', 'ejs')
app.use(express.static('public'))

app.get('/', (req, res) => {
    res.render('home')
})

app.get('/cart', (req, res) => {
    res.render('customers/cart')
})
app.get('/login', (req, res) => {
    res.render('auth/login')
})
app.get('/register', (req, res) => {
    res.render('auth/register')
})

app.listen(PORT, () => {
    console.log(`app deployed on port ${PORT}`);
})