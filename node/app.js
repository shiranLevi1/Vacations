const express = require("express");
const server = express();

const usersController = require("./controllers/users-controller");
const vacationsController = require("./controllers/vacations-controller");
const followersController = require("./controllers/followers-controller");
const errorHandler = require("./errors/error-handler");
const loginFilter = require("./middleware/loginFilter");

const cors = require('cors');
server.use(cors({ origin: "http://localhost:3000"}));

server.use(loginFilter());

server.use(express.json());
server.use("/users", usersController);
server.use("/vacations", vacationsController);
server.use("/followers", followersController);

server.use(errorHandler);

server.listen(3001, () => console.log("Listening on http://localhost:3001"));