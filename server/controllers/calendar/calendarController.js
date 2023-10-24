const Calendar = require('../../models/calendar/Calendar');
const Trip= require('../../models/trip/Trip');


const mongoose = require('mongoose');

exports.addCalendar = async (req, res) => {

    const locals = {
        title: 'Add New Calendar',
        description: 'Smart Journey Planner',
    }
    try {
       
       res.render('calendar/addcalendar',locals);

    } catch (err) {
        console.log(err);
    }
}

exports.postCalendar  = async (req, res) => {
    console.log(req.body);

    const newCalendar = new Calendar({
        day: req.body.day,
        serviceId: req.body.serviceId,
        tripIds: [],
    });

    try {
        await Calendar.create(newCalendar);
        req.flash("info", "New Calendar has been added and now add trips to your Calendar");
        res.redirect(`/addcalendartrips/${newCalendar._id}`);
    } catch (err) {
        console.log(err);
    }
    
}