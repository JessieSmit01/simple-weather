const express = require('express');
const bodyParser = require('body-parser');

// create express app
const app = express();

// parse requests of content-type
app.use(bodyParser.urlencoded({ extended: true }))

// parse requests of content-type - application/json
app.use(bodyParser.json())

// Configuring the database


require('./app/routes/account.routes.js')(app);

// define a simple route
app.get('/', (req, res) => {
    res.json({"message": "Welcome to WeatherServer"});
});

// listen for requests
app.listen(3000, () => {
    console.log("Server is listening on port 3000");
});

