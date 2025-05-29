const electionModel = require('../models/election.model');
const candidateModel = require('../models/candidate.model');
module.exports.getElectionList = async (req, res) => {
  try {
    const elections = await electionModel.find({}).sort({createdAt: -1 });
    if (!elections) {
      console.log('No elections found');
      return res.status(404).json({ message: 'No elections found' });
    }
    //console.log(elections);
    return res.status(200).json({ message: 'Election list sent successfully', elections });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: err.message });
  }
}
module.exports.createElection = async (req, res) => {
  //console.log(req.body);
  const { electionName, electionId } = req.body;
  if (!electionName || !electionId) {
    return res.status(400).json({ message: 'Please provide all the required fields' });
  }
  const existingElection = await electionModel.findOne({ electionId });
  if (existingElection) {
    return res.status(400).json({ message: 'Election with this ID already exists' });
  }

  try{
    const newElection=await electionModel.create({
      electionName:electionName,
      electionId:electionId
    })
    return res.status(201).json({message:'Election created successfully',election:newElection});
  }
  catch(err){
    console.log(err);
    return res.status(500).json({message:err.message});
  }
}

module.exports.getCandidate = async (req, res) => {
  try {
    const { electionId } = req.params;
    const candidates = await candidateModel.find({ electionId }, { _id: 1, name: 1, party: 1, symbolUrl: 1 }).sort({ party: 1 });
    if (!candidates) {
      console.log('No candidates found');
      return res.status(404).json({ message: 'No candidates found' });
    }
    //console.log(candidates);
    return res.status(200).json({ message: 'Candidate list sent successfully', candidates });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: err.message });
  }
}

module.exports.resetVotes = async (req, res) => {
  console.log(req.body);
  const { electionId } = req.body;
  if (!electionId) {
    return res.status(400).json({ message: 'Please provide the election ID' });
  }
  try {
    // Verify the election exists
    const election = await electionModel.findOne({ _id:electionId });
    if (!election) {
      return res.status(404).json({ message: 'Election not found' });
    }
    // Reset votes for all candidates in this election
    await candidateModel.updateMany({electionId:electionId }, { $set: { votes: 0 } });

    res.status(200).json({ message: 'Votes reset successfully' });
  } catch (err) {
    console.error('Error resetting votes:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports.getOngoingElection = async (req, res) => {
  try {
    const ongoingElection = await electionModel.find({ status: 'ongoing' });
    console.log(ongoingElection);

    res.status(200).json(ongoingElection);
  } catch (error) {
    console.error('Error fetching ongoing election:', error);
    res.status(500).json({ error: 'Server error' });
  }
};