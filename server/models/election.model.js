const mongoose = require('mongoose');

const electionSchema = new mongoose.Schema({
  electionName: {
    type: String,
    required: true,
  },
  electionId:{
    type: String,
    required: true,
    unique: true, 
  },
  startDate: {
    type: Date,
  },
  endDate: {
    type: Date,
  },
  //we can add more fields like location, election type, etc.
  // but for now we are keeping it simple
  status: {
    type: String,
    enum: ['upcoming', 'ongoing', 'completed'],
    default: 'upcoming',
  },
});

// Method to start the election and set duration to 12 hours
electionSchema.methods.startElection = function () {
  const now = new Date();
  this.startDate = now;
  this.endDate = new Date(now.getTime() + 12 * 60 * 60 * 1000); // Add 12 hours
  this.status = 'ongoing';
};

const electionModel = mongoose.model('Election', electionSchema);

module.exports = electionModel;
