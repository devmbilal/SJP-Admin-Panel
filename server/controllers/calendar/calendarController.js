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
