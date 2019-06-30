const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

// console.log(__dirname)
// console.log(path.join(__dirname, '../public'))

const app = express()
const port = process.env.PORT || 3000

// Define paths for Express config
const publicDir = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//Setup static diectory to serve
app.use(express.static(publicDir))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Anca'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About us',
        name: 'Anca'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Anca'
    })
})

//first page, directly from here
// app.get('', (req, res) => {
//     res.send('<h1>Weather</h1>')

// })

// app.get('/help', (req, res) =>{
//     res.send('Help page')
// })
// app.get('/about', (req,res) =>{
//     res.send('<h1>About us</h1>')
// })

app.get('/weather', (req, res) => {
    if (!req.query.address){
        return res.send({
            error: 'You have to provide an address'
        })
    }
    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if (error) {
            return res.send({ error })
        } 
    
        forecast(latitude, longitude, (error, forecastData) => {
            if (error){
                return res.send({ error })
            }
            res.send({
                location,
                forecast: forecastData,
                address: req.query.address
          })
        })
    })
})


app.get('/products', (req, res) => {
    if (!req.query.search){
        return res.send({
            error: 'You must provide a search term'
        })
    }
    console.log(req.query.search)
    res.send({
        products: []
    })
})

// app.com
// app.com/help
// app.com/about

app.get('/help/*', (req,res) =>{
    res.render('404page', {
        title: '404',
        name: 'Anca',
        errorMessage: 'Help article not found.'
    })
})

app.get('*', (req, res) =>{
    res.render('404page', {
        title: '404',
        name: 'Anca',
        errorMessage: 'Page not found.'
    })
})

app.listen(port, () => {
    console.log('Server using port ' + port)
})