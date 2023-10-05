const express = require('express');
const router = express.Router();
const homeController = require('../controllers/home/homeController');
const aboutController = require('../controllers/about/aboutController');
const stopController = require('../controllers/stops/stopController');
const sequenceController = require('../controllers/sequence/sequenceController');

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

// Sequence
router.get('/addsequence', sequenceController.addSequence);
router.post('/addsequence', sequenceController.postSequence);
router.get('/viewsequence/:id', sequenceController.viewSequence);
router.get('/editsequence/:id', sequenceController.editSequence);
router.put('/editsequence/:id', sequenceController.editPost); 
router.delete('/editsequence/:id', sequenceController.deleteSequence);

module.exports = router;