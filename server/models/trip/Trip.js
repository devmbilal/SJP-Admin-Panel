const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const tripSchema = new Schema({
tripId: {
     type: String, 
     required: true, 
     unique: true 
},
tripName: {
     type: String, 
     required: true, 
     unique: true 
},
routeId: { 
    type: String,
    required: true,
},
tripHead: { 
    type: String, 
    required: true
 },
serviceId: { 
    type: String,
    required: true 
},
  arrivalTime: { 
    type: Date 
}, 
  departureTime: { 
    type: Date 
},
vehicleId: { 
    type: String, 
    required: true 
},
createdAt:
 {
    type: Date,
    default: Date.now()
},
  updatedAt: {
    type: Date,
    default: Date.now()
  }
});

module.exports =  mongoose.model('Trip', tripSchema);