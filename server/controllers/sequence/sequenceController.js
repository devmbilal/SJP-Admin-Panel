const Sequence = require('../../models/sequence/Sequence');
const Stop = require('../../models/stop/Stop');


const mongoose = require('mongoose');

exports.addSequence = async (req, res) => {

    const locals = {
        title: 'Add New Sequence',
        description: 'Smart Journey Planner',
    }
    try {
       
       res.render('sequence/addsequence',locals);

    } catch (err) {
        console.log(err);
    }
}

exports.postSequence  = async (req, res) => {
    console.log(req.body);

    const newSequence = new Sequence({
        seqId: req.body.seqId,
        seqName: req.body.seqName,
        stops: [],
    });

    try {
        await Sequence.create(newSequence);
        req.flash("info", "New Sequence has been added and now add stops to your Sequence");
        res.redirect(`/addstopsequence/${newSequence._id}`);
    } catch (err) {
        console.log(err);
    }
    
}

exports.addStopSequence = async (req, res) => {

    const messages = req.flash('info');

    const locals = {
        title: 'Add Stops to Sequence',
        description: 'Smart Journey Planner',
    }
    try {
       const stops = await Stop.find({}, 'stopName');
       console.log(stops)
       const sequence = await Sequence.findOne({ _id: req.params.id })
       console.log(sequence)
       res.render('sequence/addstops',{locals,sequence,stops,messages});

    } catch (err) {
        console.log(err);
    }
}


exports.postStopSequence = async (req, res) => {

  const messages = req.flash('info');

  const locals = {
        title: 'Add Stops to Sequence',
        description: 'Smart Journey Planner',
    }

    try {

    const { seqId } = req.params;
    const  selectedStop= req.body.stopDropdown;
    

    if (selectedStop) {
    // Split the selected value into ID and name
    const [stopId, stopName] = selectedStop.split('_');
    const seqNumber = req.body.seqNumber;

    // Find the sequence by seqId
    const sequence = await Sequence.findOne({ _id: req.params.id });

    // Add the new stop to the stops array
    sequence.stops.push({ stopId,stopName, seqNumber });
    
    // Save the updated sequence document
    await sequence.save();
    console.log(sequence)
    const stops = await Stop.find({}, 'stopName');

    res.render('sequence/addstops',{locals,sequence,stops,messages});
    }else {
      // Handle the case where selectedStop is undefined or null
      res.status(400).send('Invalid selected stop value');
    }

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

