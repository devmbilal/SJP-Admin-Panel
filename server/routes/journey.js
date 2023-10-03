const express = require('express');
const router = express.Router();
const journeyController = require('../controllers/journeyController'); 

router.get('/', journeyController.homepage);



module.exports = router;