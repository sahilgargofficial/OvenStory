require('dotenv').config()
const express = require('express')
const app = express();
const PORT = process.env.port || 3000;
const path = require('path')
const expressLayouts = require('express-ejs-layouts');
const session = require('express-session');
const flash = require('express-flash')
const mongoose = require('mongoose');
const MongoDbStore = require('connect-mongo')(session)
const passport = require('passport')

// Database connection
const url = process.env.DATABASE_URL
mongoose.connect(url, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: true
})
const connection = mongoose.connection;
connection.once('open', () => {
    console.log("Database Connected")
}).catch(() => {
    console.log("connection failed")
});

// session store
let mongoStore = new MongoDbStore({
    mongooseConnection: connection,
    collection: 'pizza_sessions',
})

// sessions
app.use(session({
    secret: process.env.COOKIE_SECRET,
    resave: false,
    store: mongoStore,
    saveUninitialized: false,
    cookie: {maxAge: 1000 * 60 * 60}  // 1 hr

}))

// passport config after session
const passportInit = require('./app/config/passport');
passportInit(passport)
app.use(passport.initialize())
app.use(passport.session())

app.use(flash())

app.use(express.static('public'))
app.use(express.urlencoded({extended: false}))
app.use(express.json())

// Global middleware
app.use((req, res, next) => {
    res.locals.session = req.session;
    res.locals.user = req.user;
    next();
})

// set templating engine
app.use(expressLayouts);
app.set('views', path.join(__dirname, '/resources/views'))
app.set('view engine', 'ejs')

// web js routes
require('./routes/web')(app);

app.listen(PORT, () => {
    console.log(`app deployed on port ${PORT}`);
})