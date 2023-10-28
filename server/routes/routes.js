const express = require('express');
const router = express.Router();
const homeController = require('../controllers/home/homeController');
const aboutController = require('../controllers/about/aboutController');
const stopController = require('../controllers/stops/stopController');
const sequenceController = require('../controllers/sequence/sequenceController');
const routeController = require('../controllers/route/routeController');
const tripController = require('../controllers/trip/tripController');
const calendarController=require('../controllers/calendar/calendarController');

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
// View All Stops 
router.get('/stops', stopController.stops);



// Sequence
router.get('/addsequence', sequenceController.addSequence);
router.post('/addsequence', sequenceController.postSequence);
// Route to add a stop to a sequence 
router.get('/addstopsequence/:id', sequenceController.addStopSequence);
router.post('/addstopsequence/:id', sequenceController.postStopSequence);
// Route to delete a stop from sequence
router.delete('/deletestopsequence/:seqId/:stopId', sequenceController.deleteStopSequence);
//----------------------------------------
router.get('/viewsequence/:id', sequenceController.viewSequence);
router.get('/editsequence/:id', sequenceController.editSequence);
router.put('/editsequence/:id', sequenceController.editPost); 
router.delete('/editsequence/:id', sequenceController.deleteSequence);
// Route to view all sequences
router.get('/sequences', sequenceController.sequences);



// Routes
router.get('/addroute', routeController.addRoute);
router.post('/addroute', routeController.postRoute);
router.get('/viewroute/:id', routeController.viewRoute);
router.get('/editroute/:id', routeController.editRoute);
router.put('/editroute/:id', routeController.editPost); 
router.delete('/editroute/:id', routeController.deleteRoute);
router.get('/routes', routeController.routes);


// Trips
router.get('/addtrip', tripController.addTrip);
router.post('/addtrip', tripController.postTrip);
router.get('/viewtrip/:id', tripController.viewTrip);
router.get('/edittrip/:id', tripController.editTrip);
router.put('/edittrip/:id', tripController.editPost); 
router.delete('/edittrip/:id', tripController.deleteTrip);
router.get('/trips', tripController.trips);

//Calendar
router.get('/addcalendar', calendarController.addCalendar);
router.post('/addcalendar', calendarController.postCalendar);
// Route to add a trip to a calendar 
router.get('/addcalendartrip/:id', calendarController.addCalendarTrip);
router.post('/addcalendartrip/:id', calendarController.postCalendarTrip);
// Route to delete a stop from sequence
router.delete('/deletecalendartrip/:calendarId/:tripId', calendarController.deleteCalendarTrip);
//----------------------------------------
router.get('/viewcalendar/:id', calendarController.viewCalendar);
router.get('/editcalendar/:id', calendarController.editCalendar);
router.put('/editcalendar/:id', calendarController.editPost); 
router.delete('/editcalendar/:id', calendarController.deleteCalendar);

module.exports = router;