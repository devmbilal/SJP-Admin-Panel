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

    const newStop = new Stop({
        stopId: req.body.stopId,
        stopName: req.body.stopName,
        latitude: req.body.latitude,
        longitude:req.body.longitude
    });

    try {
        await Stop.create(newStop);
        req.flash("info", "New Stop has been added.");
        res.redirect('/');
    } catch (err) {
        console.log(err);
    }
    
}