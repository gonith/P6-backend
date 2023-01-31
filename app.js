const express = require('express')
const morgan = require("morgan")
const mongoose = require('mongoose')
const path = require('path');
const helmet = require('helmet')

const userRoutes = require('./routes/users')
const sauceRoutes = require('./routes/sauces')

mongoose.connect('mongodb+srv://gonith1337:93yPzZHdR6Wvt6ml@piiquante.z1bxx9l.mongodb.net/?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

const app = express()
app.use(morgan('dev'))

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

app.use(express.json())

app.use(helmet({crossOriginResourcePolicy: false,}));

// ROUTES
app.use('/api/auth', userRoutes)
app.use('/api/sauces', sauceRoutes)
app.use('/images', express.static(path.join(__dirname,'images')));

module.exports = app