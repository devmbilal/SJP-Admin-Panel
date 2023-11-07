const mongoose = require('mongoose');
const Trip = require('../../models/trip/Trip');
const Route=require('../../models/route/Route');
const { Router } = require('express');


exports.addTrip = async (req, res) => {
    const locals = {
        title: 'Add New Trip',
        description: 'Smart Journey Planner',
    }
    try {
       const routes = await Route.find({}, 'routeName');
       console.log(routes)
       res.render('trip/addtrip',{locals,routes});

    } catch (err) {
        console.log(err);
    }
}

exports.postTrip = async (req, res) => {
    console.log(req.body);

    // Find the highest existing tripId
    const highestTrip = await Trip.findOne().sort({ tripId: -1 });

    let nextTripId;
    if (highestTrip) {
        // Extract the number part of the highest tripId and increment it
        const match = highestTrip.tripId.match(/\d+/);
        const highestTripId = match ? parseInt(match[0]) : 0;
        nextTripId = `TRP-${highestTripId + 1}`;
    } else {
        // If no trips exist, start with TRP-1
        nextTripId = "TRP-1";
    }

    const newTrip = new Trip({
        tripId: nextTripId, // Use the formatted tripId
        tripName: req.body.tripName,
        tripHead: req.body.tripHead,
        arrivalTime: req.body.arrivalTime,
        departureTime: req.body.departureTime,
        vehicleId: req.body.vehicleId,
        serviceId: req.body.serviceId,
        routeId: req.body.tripDropdown,
    });

    try {
        await Trip.create(newTrip);
        req.flash("info", "New Trip has been added");
        res.redirect(`/`);
    } catch (err) {
        console.log(err);
    }
}

exports.viewTrip = async (req, res) => {

  try {
    const trip = await Trip.findOne({ _id: req.params.id })

    const locals = {
      title: "View Trip Data",
      description: "Smart Journey Planner Admin Panel",
    };

    res.render('trip/viewtrip', {
      locals,
      trip,
    })

  } catch (error) {
    console.log(error);
  }

}


exports.editTrip = async (req, res) => {

  try {
    const trip = await Trip.findOne({ _id: req.params.id })
    const routes = await Route.find({}, 'routeName');
     console.log(routes)
    const locals = {
      title: "Edit Trip Data",
      description: "Smart Journey Planner Admin Panel",
    };

    res.render('trip/edittrip', {
      locals,
      trip,
      routes
    })

  } catch (error) {
    console.log(error);
  }

}

exports.editPost = async (req, res) => {

    try {
    await Trip.findByIdAndUpdate(req.params.id,{
        tripId: req.body.tripId,
        tripName: req.body.tripName,
        tripHead: req.body.tripHead,
        arrivalTime: req.body.arrivalTime,
        departureTime:req.body.departureTime,
        vehicleId : req.body.vehicleId,
        serviceId: req.body.serviceId,
        routeId: req.body.tripDropdown,
        updatedAt: Date.now()
    });
    await res.redirect(`/edittrip/${req.params.id}`);
    
    console.log('redirected');
  } catch (error) {
    console.log(error);
  }

}

 exports.deleteTrip = async (req, res) => {
  try {
    await Trip.deleteOne({ _id: req.params.id });
    res.redirect("/")
  } catch (error) {
    console.log(error);
  }
}

exports.trips = async (req, res) => {
 
    let perPage = 3;
    let page = req.query.page || 1;

    try {
      const trips = await Trip.aggregate([ { $sort: { createdAt: -1 } } ])
        .skip(perPage * page - perPage)
        .limit(perPage)
        .exec(); 
      const count = await Trip.count();

      res.render('trip/trips', {
        trips,
        current: page,
        pages: Math.ceil(count / perPage),
      });

    } catch (error) {
      console.log(error);
    }
}