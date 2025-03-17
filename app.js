const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();

// Use the port Render provides or default to 3000 for local testing
const port = process.env.PORT || 3000;

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Fetch services data
app.get('/api/services', (req, res) => {
    try {
        const services = JSON.parse(fs.readFileSync(path.join(__dirname, 'data/services.json'), 'utf-8'));
        res.json(services);
    } catch (error) {
        console.error("Failed to load services data:", error.message);
        res.status(500).json({ error: "Failed to load services data." });
    }
});

// Search services
app.get('/api/search', (req, res) => {
    try {
        const services = JSON.parse(fs.readFileSync(path.join(__dirname, 'data/services.json'), 'utf-8'));
        const query = req.query.q?.toLowerCase() || "";

        const filteredServices = services.filter(service =>
            service.title.toLowerCase().includes(query)
        );

        res.json(filteredServices.slice(0, 5));
    } catch (error) {
        console.error("Failed to search services:", error.message);
        res.status(500).json({ error: "Failed to search services." });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
