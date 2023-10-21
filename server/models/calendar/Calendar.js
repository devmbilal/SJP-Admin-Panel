const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const calendarSchema = new Schema({
day:[{
    tripId: { 
    type: Number, 
    },
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

module.exports =  mongoose.model('Calendar',calendarSchema);