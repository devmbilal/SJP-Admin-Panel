const Stop = require('../../models/stops/Stop');
const mongoose = require('mongoose');

exports.addStop = (req, res) => {
    const locals = {
        title: 'Add New Stop',
        description: 'Smart Journey Planner',
    }

    res.render('stop/addstop',locals);
}

exports.postStop  = async (req, res) => {
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

exports.viewstop = async (req, res) => {

  try {
    const stop = await Stop.findOne({ _id: req.params.id })

    const locals = {
      title: "View Stop Data",
      description: "Smart Journey Planner Admin Panel",
    };

    res.render('stop/viewstop', {
      locals,
      stop,
    })

  } catch (error) {
    console.log(error);
  }

}
