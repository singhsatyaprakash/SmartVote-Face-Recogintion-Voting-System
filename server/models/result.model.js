const mongoose = require('mongoose');

const resultSchema = new mongoose.Schema({
  electionId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Election',
    required: true,
    unique: true,
  },
  ID:{
    type: String,
    required: true,
  },
  electionName:{
    type: String,
    required: true,
  },
  winner: {
    candidateId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Candidate',
      required: true
    },
    name: {
      type: String,
      required: true
    },
    party: {
      type: String,
      required: true
    },
    symbolUrl: {
      type: String,
      required: true
    },
    votes: {
      type: Number,
      required: true
    },
    voteDiff: {
      type: Number,
      required: true
    }
  },
  rankings: [
    {
      candidateId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Candidate',
        required: true
      },
      name: {
        type: String,
        required: true
      },
      party: {
        type: String,
        required: true
      },
      symbolUrl: {
        type: String,
        required: true
      },
      votes: {
        type: Number,
        required: true
      },
      rank: {
        type: Number,
        required: true
      }
    }
  ],
  calculatedAt: {
    type: Date,
    default: Date.now
  }
});

const Result = mongoose.model('Result', resultSchema);
module.exports = Result;
