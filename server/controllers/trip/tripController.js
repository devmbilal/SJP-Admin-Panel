const mongoose = require('mongoose');
const Trip = require('../../models/trip/Trip');


exports.addTrip = (req, res) => {
    const locals = {
        title: 'Add New Stop',
        description: 'Smart Journey Planner',
    }

    res.render('stop/addstop',locals);
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