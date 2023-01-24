const express = require('express')
const mongoose = require('mongoose')

const userRoutes = require('./routes/users')

mongoose.connect('mongodb+srv://gonith1337:93yPzZHdR6Wvt6ml@piiquante.z1bxx9l.mongodb.net/?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

const app = express()
app.use(express.json())

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

const User = require('./models/users')

app.use('/api/auth', userRoutes)

app.post('/api/auth/signup', (req, res, next) => {
    const user = new User({
        ...req.body
    })
    user.save()
        .then(() => res.status(201).json({ message: 'Utilisateur crée '}))
        .catch(error => res.status(400).json({ error }))
})

app.get('/api/auth/login', (req, res, next) => {
    user.find()
        .then(users => res.status(200).json(users))
        .catch(error => res.status(400).json({ error }))
})

module.exports = app