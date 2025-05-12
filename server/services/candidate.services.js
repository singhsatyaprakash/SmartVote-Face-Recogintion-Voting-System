const candidateModel=require('../models/candidate.model');
// module.exports.getCandidate=async(req,res)=>{
//     try{
//         const candidates=await candidateModel.find({},{_id:1,name:1,aadhaarNumber:1,party:1,symbolUrl:1}).sort({party:1});
//         if(!candidates){
//             console.log('No candidates found');
//             return res.status(404).json({message:'No candidates found'});
//         }
//         //console.log(candidates);
//         return res.status(200).json({message:'Candidate list sent sucessfully',candidates});
//     }catch(err){
//         console.log(err);
//         return res.status(500).json({message:err.message});
//     }
// }
module.exports.addCandidate=async(req,res)=>{
    try{
        console.log("upto here i am okay baby");
        const alreadyCandidate=await candidateModel.findOne({aadhaarNumber:req.body.aadhaarNumber});
        if(alreadyCandidate){
            return res.status(400).json({message:'Candidate already exists'});
        }
        const {electionId}=req.params;
        const {name,party,symbolUrl,aadhaarNumber}=req.body;
        const candidateData={name,party,symbolUrl,aadhaarNumber,electionId};
        const candidate=await candidateModel.create(candidateData);
        if(!candidate){
            return res.status(400).json({message:'Candidate not created'});
        }
        console.log('candidate created')
        return res.status(201).json({message:'Candidate added successfully',candidate});
    }catch(err){
        console.log(err);
        throw new Error("Error adding candidate");
    }
}
module.exports.resetVotes=async(req,res)=>{
    try{
        const candidates=await candidateModel.updateMany({},{$set:{votes:0}});
        if(!candidates){
            return res.status(404).json({message:'No candidates found'});
        }
        return res.status(200).json({message:'Votes reset successfully',candidates});
    }catch(err){
        console.log(err);
        return res.status(500).json({message:err.message});
    }
}
module.exports.getCandidate=async(req,res)=>{

  try {
    const { id } = req.params; // id = Election ObjectId

    const candidates = await candidateModel.find({ electionId: id }).populate('electionId');
    //console.log(candidates);
    res.status(200).json(candidates);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch candidates' });
  }
};
