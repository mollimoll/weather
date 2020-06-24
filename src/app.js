const path = require("path")
const express = require("express")
const hbs = require("hbs")

const forecast = require("../utils/forecast")
const geocode = require("../utils/geocode")

const app = express()

// --- Defining paths for Express config
// must be an absolute path to the file on your machine
// move up a directory, and add the relevant directory
const publicDirectoryPath = path.join(__dirname, "..", "/public")
const viewsPath = path.join(__dirname, "../templates/views")
const partialsPath = path.join(__dirname, "../templates/partials")

// --- Set up Express config
// tell express what templating engine we installed
// connects handlebars to express
app.set("view engine", "hbs")
// Define our views directory
app.set("views", viewsPath)
hbs.registerPartials(partialsPath)

// Set up static directory to serve
app.use(express.static(publicDirectoryPath))

const name = "Molly Boyle"

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather",
    name,
  })
})

app.get("/about", (req, res) => {
  res.render("about", { title: "About Me", header: "This is my bio", name })
})

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help",
    message: "This is the whole help message. It's a long one",
    name,
  })
})

// the route is provided first, e.g. '/help' for 'abc.com/help'
// res is how you manipulate what you want to send
app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({ error: "Please provide an address. It is required." })
  }

  return geocode(
    req.query.address,
    (error, { longitude, latitude, location } = {}) => {
      if (error) {
        return res.send({ error })
      }

      forecast(longitude, latitude, (error, forecastData) => {
        if (error) {
          return res.send({ error })
        }

        return res.send({
          forecast: forecastData,
          location,
          address: req.query.address,
        })
      })
    }
  )
})

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({ error: "You must provide a search term." })
  }
  console.log(req.query)

  res.send({ products: [] })
})

app.get("/help/*", (req, res) => {
  res.render("404", {
    message: "Help article not found",
    name,
    title: "404 Page",
  })
})

// * wildcard character means match anything not matched so far
// therefore must come as last usage of app.get
app.get("*", (req, res) => {
  res.render("404", { message: "Page not found", name, title: "404 Page" })
})
// only used once, lists the port number
app.listen(3000, () => console.log("Server is up on port 3000"))
