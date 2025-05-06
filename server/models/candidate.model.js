
const mongoose = require('mongoose');

const CandidateSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  aadhaarNumber: {
    type: String,
    required: true,
    unique: true,
  },
  party: {
    type: String,
    required: true,
  },
  symbolUrl: {
    type: String,
    required: true,
  },
  votes: {
    type: Number,
    default: 0,
  },
  electionId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Election',  // Reference to Election model
    required: true,
  }
});

const Candidate = mongoose.model('Candidate', CandidateSchema);
module.exports = Candidate;
