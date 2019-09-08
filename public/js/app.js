console.log('Client-side js file is loaded')

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

messageOne.textContent = 'From Javascript'
messageTwo.textContent = 'also from javascript'

weatherForm.addEventListener('submit', (e) => {
  e.preventDefault()
  const location = search.value

  messageOne.textContent = 'Loading'
  messageTwo.textContent = ''
  
  fetch(`/weather?address=${location}`).then((response) => {
  response.json().then((data) => {
    const { location, forecastData, error } = data
    if(error){
      console.log(error)
      messageOne.textContent = error
      messageTwo.textContent = error
    } else {
      console.log(location)
      messageOne.textContent = location
      console.log(forecastData)
      messageTwo.textContent = forecastData
    }
  })
})
})
// fetch is not a part of js. Not accessible in node.js. CLient side