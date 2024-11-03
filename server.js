// Import the Express framework, which helps us create a server
const express = require('express');

// Import body-parser, a middleware that helps us handle JSON data in requests
const bodyParser = require('body-parser');

// Create an instance of an Express application
const app = express();

// Set a port number for our server to listen on
const PORT = 3000;

// Use body-parser to automatically parse incoming JSON data
app.use(bodyParser.json());

// Serve static files (like HTML, CSS, and JavaScript) from the "public" folder
// This means any files in the "public" folder can be accessed by the client
app.use(express.static('public'));

// Define a route for form submissions to "/submit-service"
// When we receive a POST request at this route, this code will run
app.post('/submit-service', (req, res) => {

    // Log the received data to the console so we can see what was sent
    // req.body contains the JSON data sent from the client
    console.log("Received Service Data:", req.body);

    // Send a response back to the client with a success message
    // The client will display this message on the page
    res.json({ message: 'Service has been successfully submitted!' });
});

// Start the server and listen on the specified port
// This function runs once the server starts successfully
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});


