require('dotenv').config();
const express = require('express');
const routes = require('./routes/routes');
const InitiateMongoServer = require('./config/db');

const app = express();

//Initiate Mongo Server
InitiateMongoServer();

//Express Configuration
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Read the host address and the port from the environment
const PORT = process.env.PORT || 5000;

//Routes
routes(app);

// Start a TCP server listening for connections on the given port and host
app.listen(PORT, () => {
  console.log(`Server running`);
});
