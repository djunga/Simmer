const express = require('express');
const http = require('http');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session); // stores session info in database instead of server memory
const mongoose = require('mongoose');
const passport = require('./auth/passport');

// import routes
const authRoute = require('./routes/auth');
const userRoute = require('./routes/user');
const editRecipeRoute = require('./routes/editrecipe');
const recipeRoute = require('./routes/recipe');
const mylibraryRoute = require('./routes/mylibrary');

console.log(process.env.MONGODB_URI);
// connect server to the database
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017', { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false });

// initialize collection in database to store login sessions
const store = new MongoDBStore({
    uri: process.env.MONGODB_URI || 'mongodb://localhost:27017',
    collection: 'sessions'
});

const app = express();

app.use(cookieParser()); // middleware for parsing cookies in requests
app.use(bodyParser.urlencoded({ extended: false })); // middleware for parsing req.body
app.use(bodyParser.json());

const SESSION_KEY = 'connect.sid';
const SESSION_SECRET = process.env.NODE_ENV === 'production' ? process.env.JWT_SECRET : 'secret';
app.set('trust proxy', 1); // trust first proxy
app.use(session({ // initialize login sessions
    key: SESSION_KEY,
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 86400000, // expire in one day
        secure: false,
        sameSite: 'lax',
    },
    store,
}));

app.use(passport.initialize());
app.use(passport.session());

app.use('/api/auth', authRoute);
app.use('/api/user', userRoute);
app.use('/api/editrecipe', editRecipeRoute);
app.use('/api/recipe', recipeRoute);
app.use('/api/mylibrary', mylibraryRoute);

app.use('/', express.static('build'));
app.get('*', (req, res) => res.sendFile('index.html', { root: path.join(__dirname, 'build') }));


const PORT = process.env.PORT || 5000;
const server = http.createServer(app);

server.listen(PORT, () => console.log(`Server running on port ${PORT}...`));
