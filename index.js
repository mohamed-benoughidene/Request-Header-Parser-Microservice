// index.js
// where your node app starts

// init project
require("dotenv").config();
var express = require("express");
var app = express();
const useragent = require("express-useragent");

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require("cors");
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204
// Middleware to get user agent information
app.use(useragent.express());

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

// your first API endpoint...
app.get("/api/whoami", function (req, res) {
  // Get IP address from the request object
  const ipaddress = req.ip;

  // Get preferred language from the request object
  const language = req.acceptsLanguages()[0];

  // Get software information from the user agent
  const software = req.useragent.source;

  // Respond with a JSON object containing the requested information
  res.json({ ipaddress, language, software });
});

// listen for requests :)
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
