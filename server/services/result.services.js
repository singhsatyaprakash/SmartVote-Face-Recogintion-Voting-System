const resultModel = require('../models/result.model');

module.exports.saveResult = async (req, res) => {
  try {
    const { electionId,ID,electionName, winner, rankings } = req.body;

    //Check if result already exists
    const existing = await resultModel.findOne({ electionId });
    if (existing) {
      return res.status(409).json({ message: 'Result already announced for this election.' });
    }

    const result = new resultModel({
      electionId,
      ID,
      electionName,
      winner,
      rankings
    });

    await result.save();

    res.status(201).json({ message: "Result saved successfully" });
  } catch (error) {
    console.error('Error saving result:', error);
    res.status(500).json({ message: "Failed to save result", error });
  }
};

module.exports.deleteResults = async (req, res) => {
  try {
    const {electionId}=req.params;
    if (!electionId) {
      return res.json({ message: 'Election ID is required' });
    }
    const deleted=await resultModel.findOneAndDelete({ electionId:electionId });
    if (!deleted) {
      return res.json({ message: 'No results found for the given election ID' });
    }
    res.status(200).json({ message: "All results deleted successfully" });
  } catch (error) {
    console.error('Error deleting results:', error);
    res.status(500).json({ message: "Failed to delete results", error });
  }
};
module.exports.getResultList=async(req,res)=>{
    try{
        const results = await resultModel.find({}).sort({ createdAt: -1 });
        
        res.status(200).json({ message: 'Result list fetched successfully', results });
    }
    catch(err){
        console.error('Error fetching results:', err);
        res.status(500).json({ message: "Failed to fetch results", error: err.message });
    }
}