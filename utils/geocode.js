const request = require("postman-request")

const geocode = (address, callback) => {
  const accessToken =
    "pk.eyJ1IjoibW8tYm8iLCJhIjoiY2tiOTRva2JqMGF0azMxcGtoNDJzdTFxNCJ9.b7qkjK4142hMv6rzOR30Ew"
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    address
  )}.json?access_token=${accessToken}&limit=1`

  request({ url, json: true }, (err, { body }) => {
    if (err) {
      return callback("Unable to connect to location services")
    }

    const { features } = body
    const place = !!features && features[0]

    if (!place) {
      return callback("Please check your search query and try again.")
    }

    const { center, place_name: location } = place
    return callback(undefined, {
      longitude: center[0],
      latitude: center[1],
      location,
    })
  })
}

module.exports = geocode
