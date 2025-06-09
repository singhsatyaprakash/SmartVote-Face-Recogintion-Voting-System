const {validationResult}=require('express-validator');
const voterServices=require('../services/voter.services');
const voterModel=require('../models/voter.model');
const candidateModel=require('../models/candidate.model');
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');
module.exports.voterRegister=async(req,res,next)=>{
    
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        return res.status(422).json({message:"Data validation error",errors:errors.array()});
    }
    console.log(req.body);
    try{
        const voter = await voterServices.createVoter(req.body);
        if(!voter){
            return res.status(500).json({message:"Error creating voter"});
        }
        return res.status(201).json({message:"Voter registered successfully",voter});
    }
    catch(error){
        console.log(error.message);
        return res.status(500).json({message:error.message});
    }
}
module.exports.voterLogin=async(req,res,next)=>{
    //console.log(req.body);
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        return res.status(422).json({message:"Data validation error",errors:errors.array()});
    }
    try{
        const voter=await voterServices.Profile(req);
        if(!voter){
            return res.status(401).json({message:"Invalid credentials"});
        }
        const isMatch=await bcrypt.compare(req.body.password,voter.password);
        if(!isMatch){
            return res.status(401).json({message:"Invalid credentials"});
        }
        const token=jwt.sign({id:voter._id},process.env.JWT_SECRET,{expiresIn:'1h'});
        res.cookie('token',token,{
            httpOnly:true,
            sameSite:'strict',
        });
        return res.status(200).json({message:"Login successfully",token,voterProfile:voter});
    }
    catch(error){
        console.log(error.message);
        return res.status(500).json({message:error.message});
    }
}
module.exports.storeVote = async (req, res) => {
    try {
        const { voterId, candidateId, electionId } = req.body;

        // Check if voter has already voted in this election
        const voter = await voterModel.findById(voterId);
        if (!voter) {
            return res.status(404).json({ message: 'Voter not found' });
        }
        const alreadyVoted = voter.votes.some(
            (vote) => vote.electionId.toString() === electionId
        );
        if (alreadyVoted) {
            return res.status(400).json({ message: 'Voter has already voted in this election' });
        }
        // Add vote to voter's votes array
        voter.votes.push({
            electionId,
            candidateId,
            votedAt: new Date()
        });
        await voter.save();

        // Increment candidate's vote count
        const candidate = await candidateModel.findByIdAndUpdate(
            candidateId,
            { $inc: { votes: 1 } },
            { new: true }
        );
        if (!candidate) {
            return res.status(404).json({ message: 'Candidate not found' });
        }

        res.status(200).json({ message: 'Vote stored successfully' });
    } catch (error) {
        console.error(error);
         res.status(500).json({ message: 'Internal server error' });
    }
};
module.exports.isAlreadyVoted = async (req, res) => {
    const { voterId, electionId } = req.body;
    //console.log(voterId, electionId);
    const voter = await voterModel.findById(voterId);
    if (!voter) {
        return res.status(404).json({ message: "Voter not found" });
    }
    const isAlreadyVoted = voter.votes.some(
        (vote) => vote.electionId.toString() === electionId
    );
    res.status(200).json({ message: isAlreadyVoted ? "Already voted" : "Not voted already", isAlreadyVoted });
}
