const adminModel=require('../models/admin.model');
const candidateModel=require('../models/candidate.model');
module.exports.Profile=async(req,res)=>{
    console.log("i am okay baby");
    const admin=await adminModel.findOne({userID:req.body.userID});
    return admin;
}
module.exports.addCandidate=async(candidateData)=>{
    try{
        const candidate=await candidateModel.create(candidateData);
        return candidate;
    }catch(err){
        console.log(err);
        throw new Error("Error adding candidate");
    }
}

module.exports.getProfileById=async(req,res)=>{
    const {id}=req.params;
    const admin=await adminModel.findById({_id:id});
    res.status(200).json({message:"Confirmation of admin",admin});
}