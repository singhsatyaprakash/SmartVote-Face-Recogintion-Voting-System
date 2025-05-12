const voterModel=require('../models/voter.model');
const bcrypt=require('bcryptjs');
const {validationResult}=require('express-validator');

module.exports.createVoter=async(voterData)=>{
    voterData.password=await bcrypt.hash(voterData.password,10);
    try{
        const voter=await voterModel.create(voterData);
        return voter;
    }catch(err){
        console.log(err);
        throw new Error("Error creating voter");
    }
}
module.exports.Profile=async(req,res)=>{
    // const errors=validationResult(req);
    // if(errors){
    //     console.log('failed here');
    //     return res.status(422).json({errors:errors.array()});
    // }
    console.log('passed here');
    try{
        const voter=await voterModel.findOne({aadhaarNumber: req.body.aadhaarNumber});
        return voter;
    }
    catch(err){
        console.log(err);
        throw new Error("Error fetching voter profile");
    }
}
module.exports.voterList = async (req, res, next) => {
    try {
      const voters = await voterModel.find({}, {username: 1, age: 1,_id:0}).sort({username:1}); 
      console.log(voters);
      res.status(200).json({message:'Voter list sent suceesfully',voters}); // Send the list directly
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Error fetching voters" });
    }
};

module.exports.isVoter=async(req,res,next)=>{
    try{
        const voter=await voterModel.findOne({  aadhaarNumber:req.body.aadhaarNumber});
        if(!voter){
            return res.status(404).json({message:"Candidate is not voter"});
        }
        console.log('Voter found');
        next();
    }catch(err){
        console.log(err);
        return res.status(500).json({message:"Error checking voter"});
    }
}
module.exports.getProfileById=async(req,res)=>{
    const {id}=req.params;
    // console.log(id);
    const voter=await voterModel.findById({_id:id});//try to not send all data to console only neede things
    // console.log(voter);
    res.status(200).json({message:"Conformation of voter",voter})
}
module.exports.getdescriptor=async(req,res)=>{
    const {id}=req.params;
    const descriptor=await voterModel.findById({_id:id},{descriptor:1,_id:0});
    if(!descriptor){
        res.status(404).json({message:"Descriptoe of login user not found please login again"});
    }
    res.status(200).json({message:"Descriptor found.",descriptor});
}