const Sequence = require('../../models/sequence/Sequence');
const Stop = require('../../models/stop/Stop');


const mongoose = require('mongoose');

exports.addSequence = async (req, res) => {

    const locals = {
        title: 'Add New Sequence',
        description: 'Smart Journey Planner',
    }
    try {
       const stops = await Stop.find({}, 'stopName');
       console.log(stops)
       res.render('sequence/addsequence',{locals,stops});

    } catch (err) {
        console.log(err);
    }
}

exports.postSequence  = async (req, res) => {
    console.log(req.body);

    const newSequence = new Sequence({
        stopId: req.body.stopId,
        seqId: req.body.seqId,
        seqNumber: req.body.seqNumber,
    });

    try {
        await Sequence.create(newSequence);
        req.flash("info", "New Sequence has been added.");
        res.redirect('/');
    } catch (err) {
        console.log(err);
    }
    
}

exports.viewSequence = async (req, res) => {

  try {
    const sequence = await Sequence.findOne({ _id: req.params.id })

    const locals = {
      title: "View Sequence Data",
      description: "Smart Journey Planner Admin Panel",
    };

    res.render('sequence/viewsequence', {
      locals,
      sequence,
    })

  } catch (error) {
    console.log(error);
  }

}


exports.editSequence = async (req, res) => {

  try {
    const sequence = await  Sequence.findOne({ _id: req.params.id })

    const locals = {
      title: "View Sequence Data",
      description: "Smart Journey Planner Admin Panel",
    };

    res.render('sequence/editsequence', {
      locals,
      sequence
    })

  } catch (error) {
    console.log(error);
  }

}

exports.editPost = async (req, res) => {

    try {
    await  Sequence.findByIdAndUpdate(req.params.id,{
        stopId: req.body.stopId,
        stopId: req.body.stopId,
        seqNumber: req.body.seqNumber,
        updatedAt: Date.now()
    });
    await res.redirect(`/editsequence/${req.params.id}`);
    
    console.log('redirected');
  } catch (error) {
    console.log(error);
  }

}

  exports.deleteSequence = async (req, res) => {
  try {
    await  Sequence.deleteOne({ _id: req.params.id });
    res.redirect("/")
  } catch (error) {
    console.log(error);
  }
}

