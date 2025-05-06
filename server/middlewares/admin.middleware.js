const adminController=require('../controllers/admin.contollers');
const adminServices=require('../services/admin.services');
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');
const {validationResult}=require('express-validator');
const dotenv= require('dotenv');
dotenv.config();

module.exports.AuthenticateAdminProfile=async(req,res,next)=>{
    const errors=validationResult(req.body);
   
    if(!errors.isEmpty()){
        
        return res.status(400).json({message:errors.array()});
    }
   
    const {userID, email,password}=req.body;

    if(!userID || !email || !password){
        return res.status(400).json({message:'Please provide all credentials'});
    }
    
    try {
        const admin = await adminServices.Profile(req,res);
     
        if (!admin) {
            return res.status(401).json({ message: 'Invalid credentials' }); 
        }
        const isMatch=await bcrypt.compare(password,admin.password);

        if(!isMatch){
            return res.status(401).json({message:'Invalid credentials'});
        }
        console.log('Admin verified successfully');
        next();
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({message:error.message});
    }
}
 