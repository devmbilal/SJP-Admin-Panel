const Calendar = require('../../models/calendar/Calendar');
const Trip= require('../../models/trip/Trip');


const mongoose = require('mongoose');

exports.addCalendar = async (req, res) => {

    const locals = {
        title: 'Add New Calendar',
        description: 'Smart Journey Planner',
    }
    try {
       const trips = await Trip.find({});
       res.render('calendar/addcalendar',{locals,trips});

    } catch (err) {
        console.log(err);
    }
}

exports.postCalendar  = async (req, res) => {
    console.log(req.body);

    const newCalendar = new Calendar({
        day: req.body.day,
        serviceId: req.body.serviceDropdown,
        tripIds: [],
    });

    try {
        await Calendar.create(newCalendar);
        req.flash("info", "New Calendar has been added and now add trips to your Calendar");
        res.redirect(`/addcalendartrip/${newCalendar._id}`);
    } catch (err) {
        console.log(err);
    }
    
}

exports.addCalendarTrip = async (req, res) => {

    const messages = req.flash('info');

    const locals = {
        title: 'Add Trips to Calendar',
        description: 'Smart Journey Planner',
    }
    try {
       const trips = await Trip.find({}, 'tripName');
       console.log(trips)
       const calendar = await Calendar.findOne({ _id: req.params.id })
       console.log(calendar)
       res.render('calendar/addtrips',{locals,calendar,trips,messages, getTripName});

    } catch (err) {
        console.log(err);
    }
}


exports.postCalendarTrip = async (req, res) => {

  const messages = req.flash('info');

  const locals = {
        title: 'Add Trips to Calendar',
        description: 'Smart Journey Planner',
    }

    try {

    const { calendarId } = req.params;
    const  tripId = req.body.tripDropdown;
    
    if (tripId) {

    // Find the sequence by calendarId
    const calendar = await Calendar.findOne({ _id: req.params.id });

    // Add the new stop to the trips array
    calendar.tripIds.push({ tripId });
    
    // Save the updated calendar document
    await calendar.save();
    console.log(calendar)
    const trips = await Trip.find({}, 'tripName');

    res.render('calendar/addtrips',{locals,calendar,trips,messages});
    }else {
      // Handle the case where selectedStop is undefined or null
      res.status(400).send('Invalid selected trip value');
    }

    } catch (err) {
        console.log(err);
    }
}