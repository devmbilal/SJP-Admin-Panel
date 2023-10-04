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

exports.viewStop = async (req, res) => {

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


exports.editStop = async (req, res) => {

  try {
    const stop = await Stop.findOne({ _id: req.params.id })

    const locals = {
      title: "View Stop Data",
      description: "Smart Journey Planner Admin Panel",
    };

    res.render('stop/editstop', {
      locals,
      stop
    })

  } catch (error) {
    console.log(error);
  }

}

exports.editPost = async (req, res) => {

    try {
    await Stop.findByIdAndUpdate(req.params.id,{
      stopId: req.body.stopId,
        stopName: req.body.stopName,
        latitude: req.body.latitude,
        longitude:req.body.longitude,
        updatedAt: Date.now()
    });
    await res.redirect(`/editstop/${req.params.id}`);
    
    console.log('redirected');
  } catch (error) {
    console.log(error);
  }

}

  exports.deleteStop = async (req, res) => {
  try {
    await Stop.deleteOne({ _id: req.params.id });
    res.redirect("/")
  } catch (error) {
    console.log(error);
  }
}

