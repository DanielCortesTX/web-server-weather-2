const path = require('path')
const express = require('express')

console.log(__dirname)
console.log(path.join(__dirname, '../public'))

const app = express()
const publicDirectoryPath = path.join(__dirname, '../public')

app.use(express.static(publicDirectoryPath))

app.get('/', (req, res) => {
  res.send('<h1>Hello Express!</h1>')
})

app.get('/weather', (req, res) => {
  res.send({
    forecast: 'It is sunny',
    location: 'Philadelphia'
  })
})

app.listen(3000, () => {
  console.log('Server is up on port 3000')
})
// Express is a function that creates the server, everything else is changing the settings of it.