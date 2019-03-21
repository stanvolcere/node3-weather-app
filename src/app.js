const path = require('path');
const express = require("express");
const hbs = require('hbs');
//making http requests for weather info
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

// allows for easier path manipulation
var app = express();

// useful paths 
var publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// this line sets up handlebars as our templating engine
app.set("view engine", "hbs");

// defines the path inside which node should try to locate the views
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

//customises the server, to use a static dir
app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
    res.render('index', {
        title: "Weather App",
        Author: "Stan Volcere",
        Tool: "Node"
    });
});

app.get("/help", (req, res) => {
    res.render('help', {
        title: "Weather App",
        Author: "Stan Volcere",
        Tool: "Node"
    });
});

app.get("/about", (req, res) => {
    res.render('about', {
        title: "Weather App",
        Author: "Stan Volcere",
        Tool: "Node"
    });
});

// this is one of the many endpoints 
app.get("/weather", (req, res) => {

    if (!req.query.address) {
        return res.send({
            error: "Please provide an Address"
        });
    }

    var location = req.query.address;

    // use of default parameter to ensure code still works althought incorrect query is provided
    geocode(location, (error, {latitude, longitude, location} = {}) => {
        if (error) {
            return res.send({
                error: error
            });
        }
    
        //usage of object destructuring here
        forecast(latitude, longitude, (error, { summary }) => {
          if (error) {
            return res.send({
                error: error
            });
          } 
    
          return res.send({
                location: location,
                expect: summary,
          });
        });
    });
});

app.get("/help/*", (req, res) => {
    res.render('404', {
        message: "Help article was not found!",
    });
});

app.get("*", (req, res) => {
    res.render('404', {
        message: "This page was not found!",
    });
});

app.listen(3000,() => {
    console.log("Server has started!"); 
});