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
       res.render('calendar/addtrips',{locals,calendar,trips,messages});

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

exports.deleteCalendarTrip = async (req, res) => {
  
  try {
     const { calendarId, tripId } = req.params;
    // Find the calendar by calendarId
    const calendar = await Calendar.findOne({ _id: calendarId });
    // Filter out the trips to be deleted from the tripIds array
    calendar.tripIds = calendar.tripIds.filter(trip => trip.tripId !== tripId);
    // Save the updated calendar document
    await calendar.save();
    // Redirect to wherever you want after deleting a trip from the calendar
    res.redirect(`/addcalendartrip/${calendarId}`);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
}

exports.viewCalendar = async (req, res) => {

  try {
    const calendar = await Calendar.findOne({ _id: req.params.id })
    const trips = await Trip.find({}, 'tripName');
    const locals = {
      title: "View Calendar Data",
      description: "Smart Journey Planner Admin Panel",
    };

    res.render('calendar/viewcalendar', {
      locals,
      calendar,
      trips
    })

  } catch (error) {
    console.log(error);
  }
}
exports.editCalendar = async (req, res) => {

  try {
    const calendar = await  Calendar.findOne({ _id: req.params.id })
    const trips = await Trip.find({});
    const locals = {
      title: "Edit Calendar Data",
      description: "Smart Journey Planner Admin Panel",
    };

    res.render('calendar/editcalendar', {
      locals,
      calendar,
      trips
    })

  } catch (error) {
    console.log(error);
  }

}

exports.editPost = async (req, res) => {

  console.log(req.body);

    try {
    await  Calendar.findByIdAndUpdate(req.params.id,{
        day: req.body.day,
        serviceId: req.body.serviceDropdown,
        updatedAt: Date.now()
    });
    await res.redirect(`/editcalendar/${req.params.id}`);
    
    console.log('redirected');
  } catch (error) {
    console.log(error);
  }

}

  exports.deleteCalendar = async (req, res) => {
  try {
    await  Calendar.deleteOne({ _id: req.params.id });
    res.redirect("/")
  } catch (error) {
    console.log(error);
  }
}

exports.calendars = async (req, res) => {
 
    let perPage = 12;
    let page = req.query.page || 1;

    try {
      const calendars = await Calendar.aggregate([ { $sort: { createdAt: -1 } } ])
        .skip(perPage * page - perPage)
        .limit(perPage)
        .exec(); 
      const count = await Calendar.count();

      res.render('calendar/calendars', {
        calendars,
        current: page,
        pages: Math.ceil(count / perPage),
      });

    } catch (error) {
      console.log(error);
    }
}

