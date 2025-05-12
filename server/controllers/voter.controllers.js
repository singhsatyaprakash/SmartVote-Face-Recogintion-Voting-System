const {validationResult}=require('express-validator');
const voterServices=require('../services/voter.services');
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