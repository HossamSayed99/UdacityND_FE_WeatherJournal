// Setup empty JS object to act as endpoint for all routes
let projectData = {};
const port = 8000;
// Require Express to run server and routes
const express = require('express');
// Start up an instance of app
const app = express();

/* Middleware*/
const bodyParser = require('body-parser')
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());
// Initialize the main project folder
app.use(express.static('website'));


// Setup Server
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
});

// A GET route setup to return the endpoint
app.get('/all', (req, res) =>{
    res.send(projectData);
});

// A POST route setup to overwrite the new endpoint with the last entry
app.post('/data',(req, res) =>{
    let newData = req.body;
    let newEntry = {
        temp : newData.temperature,
        date : newData.date,
        user_response : newData.user_response
    }
    projectData = newEntry;
    console.profile(projectData);
});