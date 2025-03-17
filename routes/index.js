const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

// Load services data
let popularServices;
try {
    const dataPath = path.join(__dirname, '/data/services.json');
    popularServices = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));
} catch (error) {
    console.error("Failed to load services data:", error.message);
    popularServices = [];
}

// Routes
router.get('/', (req, res) => {
    res.render('index', { pageTitle: "Home - Vishwanandan Home Services", popularServices });
});

router.get('/about', (req, res) => {
    res.render('about', { pageTitle: "About Us" });
});

router.get('/services', (req, res) => {
    res.render('services', { pageTitle: "Our Services", popularServices });
});

router.get('/contact', (req, res) => {
    res.render('contact', { pageTitle: "Contact Us" });
});

module.exports = router;
