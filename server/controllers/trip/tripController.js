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
     
     
        const newTrip = new Trip({
        tripId: req.body.tripId,
        tripName: req.body.tripName,
        tripHead: req.body.tripHead,
        arrivalTime: req.body.arrivalTime,
        departureTime:req.body.departureTime,
        vehicleId : req.body.vehicleId,
        routeId: req.body.tripDropdown,
        serviceId : req.body.serviceId
    });

    try {
        await Trip.create(newTrip);
        req.flash("info", "New Trip has been added");
        res.redirect(`/`);
    } catch (err) {
        console.log(err);
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
        routeId: req.body.tripDropdown,
        serviceId : req.body.serviceId,
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