const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

// Define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather',
    name: 'Andrew Mead'
  })
})

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About Me',
    name: 'Andrew Mead'
  })
})

app.get('/help', (req, res) => {
  res.render('help', {
    message: 'You are being helped',
    title: 'Help',
    name: 'Andrew Mead'
  })
})

app.get('/', (req, res) => {
  res.send('<h1>Hello Express!</h1>')
})

app.get('/weather', (req, res) => {
  const { address } = req.query
  if(!address){
    return res.send({
      error: 'You must provide address'
    })
  }

  geocode(address, (error, { latitude, longitude, location }) => {
    if(error){
      return res.send({ error })
    }
    
    forecast(latitude, longitude, (error, forecastData) => {
      if(error){
        return res.send({ error })
      }
      
      return res.send({
        location,
        forecastData
      })
    })
  })

})

app.get('/products', (req, res) => {
  if(!req.query.search){
    return res.send({
      error: 'You must provide a search term'
    })
  }
  res.send({
    products: []
  })
})

app.get('/help/*', (req, res) => {
  res.render('404', {
    title: '404 help',
    name: 'Andrew Mead',
    errorMessage: '404 page not found',
    help: 'Cannot get help article'
  })
})

app.get('*', (req, res) => {
  res.render('404', {
    title: '404',
    name: 'Andrew Mead',
    errorMessage: '404 page not found'
  })
})

app.listen(3000, () => {
  console.log('Server is up on port 3000')
})
// Express is a function that creates the server, everything else is changing the settings of it.