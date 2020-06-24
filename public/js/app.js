const fetchWeather = (location, callback) =>
  fetch(`/weather?address=${location}`).then((res) => {
    res.json().then((data) => {
      callback(data)
    })
  })

const weatherForm = document.querySelector("form")
const searchField = document.querySelector("input")
const messageOne = document.querySelector("p.error")
const messageTwo = document.querySelector("p.forecast")

weatherForm.addEventListener("submit", (e) => {
  e.preventDefault()
  messageOne.textContent = ""
  messageTwo.textContent = "Fetching weather..."

  const location = searchField.value
  fetchWeather(location, (forecast) => {
    if (forecast.error) {
      messageOne.textContent = forecast.error
    }
    messageOne.textContent = forecast.location
    messageTwo.textContent = forecast.forecast
  })
})
