const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = 3000;

// Middleware to handle JSON and form data
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Serve static files (like HTML, CSS, JS files)
app.use(express.static('public'));

// Route to handle form submissions
app.post('/submit-service', (req, res) => {
    const { title, description, category, price } = req.body;
    const file = req.file ? req.file.originalname : "No file uploaded";

    // For now, log the data to console (simulate saving to a database)
    console.log("Service Submitted:", { title, description, category, price, file });

    // Send response back to the client
    res.json({ message: 'Service has been successfully submitted!' });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
