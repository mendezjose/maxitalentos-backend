require("express-async-errors");
const winston = require("winston");
const express = require("express");
const config = require("config");
const path = require("path");
const app = express();

app.use(express.static(path.join(__dirname, "client/build")));
require("./startup/prod")(app);
require("./startup/logging")();
require("./startup/cors")(app);
require("./startup/routes")(app);
require("./startup/db")();
require("./startup/config")();
require("./startup/validation")();

const port = process.env.PORT || config.get("port");
const server = app.listen(port, () =>
  winston.info(`Listening on port ${port}...`)
);

module.exports = server;
