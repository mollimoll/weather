const request = require("postman-request")

const forecast = (lon, lat, callback) => {
  const accessKey = "ea6c2891e4b94f66b71febbfad95e370"
  const url = `http://api.weatherstack.com/current?access_key=${accessKey}&query=${lat},${lon}&units=f`

  request({ url, json: true }, (err, { body } = {}) => {
    // used for request level errors, not API specific ones
    if (err) {
      return callback("Unable to connect to weather service.")
    } else if (body.error) {
      return callback(body.error.info)
    }
    const weather = body.current
    const forecastData = `${weather.weather_descriptions[0]}. It is currently ${weather.temperature} degrees out. It feels like ${weather.feelslike} degrees out.`

    callback(undefined, forecastData)
  })
}

module.exports = forecast
