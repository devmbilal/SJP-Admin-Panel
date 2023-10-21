const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const calendarSchema = new Schema({
days:[{
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
}],
serviceId:{
    type: String,
    required: true,
},
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