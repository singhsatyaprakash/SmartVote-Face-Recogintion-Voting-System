// voterModel.js

const mongoose = require('mongoose');

const voterSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    trim: true
  },
  aadhaarNumber: {
    type: String,
    required: true,
    unique: true,
    length: 12 // Aadhaar number is 12 digits
  },
  dob:{
    type:String,
    required:true,
    match:[/^\d{4}-\d{2}-\d{2}$/, "Date of birth should be in YYYY-MM-DD format"]
  },
  age: {
    type: Number,
    required: true,
    min: 18
  },
  password:{
    type: String,
    required: true,
    minlength: 6
  },
  descriptor: {
    type: Map,
    of: Number, // Defines that the values in the map will be numbers
    required: true,
  },
  hasVoted: {
    type: Boolean,
    default: false
  },
  votedCandidate: {
    type: String,
    default: null
  }
});

const voter = mongoose.model('Voter', voterSchema);

module.exports = voter;
