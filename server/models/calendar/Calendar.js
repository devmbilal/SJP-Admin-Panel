const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const calendarSchema = new Schema({
monday:[{
    tripId: { 
    type: Number, 
    },
  }],
tuesday: [{
    tripId: { 
    type: Number, 
    },
  }],
wednesday: [{
    tripId: { 
    type: Number, 
    },
  }],
thrusday: [{
    tripId: { 
    type: Number, 
    },
  }],
friday:[{
    tripId: { 
    type: Number, 
    },
  }],
saturday: [{
    tripId: { 
    type: Number, 
    },
  }],
sunday:[{
    tripId: { 
    type: Number, 
    },
  }],
createdAt:{
    type: Date,
    default: Date.now()
},
  updatedAt: {
    type: Date,
    default: Date.now()
  }
});

module.exports =  mongoose.model('Calendar', calendarSchema);