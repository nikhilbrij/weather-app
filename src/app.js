const path = require("path");
const express = require("express");
const hbs = require("hbs");
const request = require("request");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const app = express();
const port = process.env.PORT || 3000;

//Define path for Express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

//Setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

//Setup static directory to serve
app.use(express.static(publicDirectoryPath));

// @type    GET
// @route   /
// @desc    route for Home page
// @access  PUBLIC
app.get("/", (req, res) => {
  res.render("index", {
    title: "Weather",
    name: "Nikhil Brijpuriya"
  });
});

// @type    GET
// @route   /about
// @desc    route for About page
// @access  PUBLIC
app.get("/about", (req, res) => {
  res.render("about", {
    title: "about page",
    name: "Nikhil Brijpuriya"
  });
});

// @type    GET
// @route   /help
// @desc    route for Help page
// @access  PUBLIC
app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help page",
    name: "Nikhil Brijpuriya"
  });
});

// @type    GET
// @route   /weather
// @desc    route for feth to Weather data
// @access  PUBLIC
app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "please provide an address"
    });
  }

  geocode(
    req.query.address,
    (error, { latitude, longitude, location } = {}) => {
      if (error) return res.send({ error: error });

      forecast(latitude, longitude, (error, forecastData) => {
        if (error) return res.send({ error: error });

        res.send({
          forecast: forecastData,
          location,
          address: req.query.address
        });
      });
    }
  );
});

// @type    GET
// @route   /help/*
// @desc    route for 404
// @access  PUBLIC
app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Nikhil Brijpuriya",
    errorMessage: "Help article not found."
  });
});

// @type    GET
// @route   /*
// @desc    route for 404
// @access  PUBLIC
app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Nikhil Brijpuriya",
    errorMessage: "Page not found."
  });
});

app.listen(port, () => {
  console.log("Server is running at port " + port);
});
