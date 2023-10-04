const express = require('express');
const router = express.Router();
const homeController = require('../controllers/home/homeController');
const aboutController = require('../controllers/about/aboutController');
const stopController = require('../controllers/stops/stopController');

// Home Page
router.get('/', homeController.homepage);

// About
router.get('/about', aboutController.about);

// Stops
router.get('/addstop', stopController.addStop);
router.post('/addstop', stopController.postStop);
router.get('/viewstop/:id', stopController.viewStop);
router.get('/editstop/:id', stopController.editStop);
router.put('/editstop/:id', stopController.editPost); 
router.delete('/editstop/:id', stopController.deleteStop);

module.exports = router;