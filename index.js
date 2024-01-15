"use strict";
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const mailAPI = require("./routes/mail-api.js");

// Express body parser
app.use(cors());
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    limit: "10mb",
    extended: false,
    parameterLimit: 10000,
  })
);

// set the ejs as view engine
app.set("view engine", "ejs");

// setup public folder
app.use(express.static("./public"));

// use the routes specified in route folder
app.use("/api/v1", mailAPI);

// Error handling middleware
app.use((err, req, res, next) => {
  // Check for JSON parsing error
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    console.error(err.message);
    return res.status(400).json({
      status: 'fail',
      message: 'Invalid JSON format in the request body.',
    });
  }

  // Handle other errors
  console.error(err.message);
  res.status(500).json({
    status: 'error',
    message: 'Something went wrong in the server.',
  });
});

// Additional middleware for handling 404 Not Found
app.use((req, res) => {
  console.error("Route not found.");
  res.status(404).json({
    status: 'fail',
    message: 'Route not found.',
  });
});

const port = process.env.PORT || 3000;

//listen to the server
app.listen(port, function () {
  console.log(`listening to the port ${port} .....`);
});
