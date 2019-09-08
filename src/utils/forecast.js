const request = require('request')

const forecast = (latitude, longitude, callback) => {
  const url = 'https://api.darksky.net/forecast/c34a4f7fecf55ec3445b8e45ed48c30c/' + latitude + ',' + longitude + ''

  request({ url, json: true}, (error, { body }) => {
    if(error){
      callback('Unable to connect to weather Service', undefined)
    } else if (body.error){
      callback('Unable to find location', undefined)
    } else {
      const { temperature, precipProbability } = body.currently
      callback(undefined, `${body.daily.data[0].summary} It is currently ${temperature} degrees out. There is a ${precipProbability}% chance of rain. The high today is ${body.daily.data[0].temperatureHigh} with a low of ${body.daily.data[0].temperatureLow}.`)
    }
  })
}

module.exports = forecast