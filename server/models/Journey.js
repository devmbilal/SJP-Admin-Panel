const mongoose = require('mongoose');


// Stop Schema
const stopSchema = new mongoose.Schema({
  stop_id: { type: String, required: true, unique: true },
  stop_name: { type: String, required: true },
  stop_lat: { type: Number, required: true },
  stop_long: { type: Number, required: true }
});

// Stop Sequence Schema
const stopSequenceSchema = new mongoose.Schema({
  seq_id: { type: String, required: true, unique: true },
  stop_id: { type: String, required: true },
  seq_number: { type: Number, required: true }
});

// Route Schema
const routeSchema = new mongoose.Schema({
  route_id: { type: String, required: true, unique: true },
  route_name: { type: String, required: true },
  seq_id: { type: String, required: true } 
});

// Trip Schema
const tripSchema = new mongoose.Schema({
  trip_id: { type: String, required: true, unique: true },
  route_id: { type: String, required: true }, 
  trip_head: { type: String, required: true },
  service_id: { type: String, required: true },
  arrival_time: { type: Date }, 
  dep_time: { type: Date },
  vehicle_id: { type: String, required: true }
});

// Calendar Schema
const calendarSchema = new mongoose.Schema({
  service_id: { type: String, required: true, unique: true },
  day: { type: String, required: true }
});

// Define models
const Stop = mongoose.model('Stop', stopSchema);
const StopSequence = mongoose.model('StopSequence', stopSequenceSchema);
const Route = mongoose.model('Route', routeSchema);
const Trip = mongoose.model('Trip', tripSchema);
const Calendar = mongoose.model('Calendar', calendarSchema);

// Export models
module.exports = {
  Stop,
  StopSequence,
  Route,
  Trip,
  Calendar
};
