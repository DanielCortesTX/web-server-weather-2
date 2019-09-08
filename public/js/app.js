console.log('Client-side js file is loaded')

fetch('http://localhost:3000/weather?address=philadelphia').then((response) => {
  response.json().then((data) => {
    if(data.error){
      console.log(data.error)
    } else {
      console.log(data.location)
      console.log(data.forecastData)
    }
  })
})
// fetch is not a part of js. Not accessible in node.js. CLient side