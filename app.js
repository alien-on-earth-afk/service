const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();
const port = 3000;

// Serve static files (HTML, CSS, JS, etc.)
app.use(express.static(path.join(__dirname, 'public')));

// Fetch services data (Full Data Fetch)
app.get('/api/services', (req, res) => {
    try {
        const services = JSON.parse(fs.readFileSync('./data/services.json', 'utf-8'));
        res.json(services);
    } catch (error) {
        console.error("Failed to load services data:", error.message);
        res.status(500).json({ error: "Failed to load services data." });
    }
});

// Search services (Partial Data Fetch)
app.get('/api/search', (req, res) => {
    try {
        const services = JSON.parse(fs.readFileSync('./data/services.json', 'utf-8'));
        const query = req.query.q?.toLowerCase() || "";

        const filteredServices = services.filter(service => 
            service.title.toLowerCase().includes(query)
        );

        res.json(filteredServices.slice(0, 5)); // Limit results to 5
    } catch (error) {
        console.error("Failed to search services:", error.message);
        res.status(500).json({ error: "Failed to search services." });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
