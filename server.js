const express = require('express')
const app = express();
const PORT = process.env.port || 3000;
const path = require('path')
const ejs = require('ejs');
const expressLayouts = require('express-ejs-layouts');

app.get('/', (req, res) => {
    res.render('home')
})

// set templating engine
app.use(expressLayouts);
app.set('views', path.join(__dirname, '/resources/views'))
app.set('view engine', 'ejs')
app.listen(PORT, () => {
    console.log(`app deployed on port ${PORT}`);
})