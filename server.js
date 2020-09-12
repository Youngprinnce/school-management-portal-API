require('dotenv').config();
const express = require('express');
const path = require('path');
const routes = require('./routes');
const InitiateMongoServer = require('./config/db');

//Initiate Mongo Server
InitiateMongoServer();

//Express app initialization
const app = express();

// Template engine configuration
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

//Express configuration
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Read the host address and the port from the environment
const hostname = process.env.HOST;
const port = process.env.PORT;

app.use('/api/user', routes());
app.get('/', (req, res) => {
  res.status(200).json({
    message: 'Welcome to Simple Registration and Login Api!!!',
    HowToUse: 'Nnavigate to http://localhost:3000/api/user/register  to register',
    HowToUSe2: 'A veification email will be sent to your email, please activate',
    HowToUSe3:
      'Finally navigate to http://localhost:3000/api/user/login to login. Feel free to use code in your application',
  });
});

// Start a TCP server listening for connections on the given port and host
app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
