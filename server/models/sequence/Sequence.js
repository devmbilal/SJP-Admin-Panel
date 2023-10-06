const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const sequenceSchema = new Schema({
  seqId: { 
     type: String, 
     required: true,
     unique: true 
    },
  stopId: { 
    type: String,
     required: true
     },
  seqNumber: {
     type: Number, 
     required: true 
    },
  createdAt: {
    type: Date,
    default: Date.now()
  },
  updatedAt: {
    type: Date,
    default: Date.now()
  }
});

module.exports =  mongoose.model('Sequence', sequenceSchema);