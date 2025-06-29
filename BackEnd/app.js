// ` import express
const express = require("express");
// ` create web server
const app = express();
// ` import body-parser
const bodyParser = require("body-parser");

// ` import cors
const cors = require("cors");

// ` import dotenv
require("dotenv").config();
// Enable CORS middleware
app.use(cors());

// Enable JSON middleware
app.use(bodyParser.json());

// ` create a port from env file
const port = process.env.PORT || 3001; // Use a configurable port

// ` import routes
const routes = require("./routes/index");

// ` Add the routes to the application as middleware
app.use(routes);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

// ` create app listener

app.listen(port, () => {
  console.log(` listening on http://localhost:${port}`);
});

// ` export app

module.exports = app;
