const express = require('express')
const path = require('path')
const hbs = require('hbs')
require('./db/mongoose')
const donorRouter = require('./routers/donorRouter')
const receiverRouter = require('./routers/receiverRouter')
const volRouter = require('./routers/volRouter');


const app = express()
const port = process.env.PORT || 3000

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const publicDirectoryPath = path.join(__dirname, '../public/')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

app.use(express.static(publicDirectoryPath))
app.use(express.json())
app.use(donorRouter)
app.use(receiverRouter)
app.use(volRouter)

app.get('', (req, res) => {
    res.render('index', {
        title: 'Spread Smiles',
        name: 'Sushmitha'
    })
})

app.get('/gallery', (req, res) => {
    res.render('gallery', {
        title: 'Gallery',
        name: 'Sushmitha'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Sushmitha'
    })
})


app.listen(port, () => {
    console.log('Server is up on port ' + port)
})