"use strict";
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const appAPI = require("./routes/app-api");
const mailAPI = require("./routes/mail-api.js");

// Express body parser
app.use(cors());
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    limit: "50mb",
    extended: false,
    parameterLimit: 50000,
  })
);

// set the ejs as view engine
app.set("view engine", "ejs");

// setup public folder
app.use(express.static("./public"));

// use the routes specified in route folder
app.use("/", appAPI);
app.use("/api/v1", mailAPI);

const port = process.env.PORT || 4444;

//listen to the server
app.listen(port, function () {
  console.log(`listening to the port ${port} .....`);
});
