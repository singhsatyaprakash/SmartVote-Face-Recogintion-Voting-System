const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
dotenv.config();
const adminServices = require('../services/admin.services');
const electionModel = require('../models/election.model');
const voterModel = require('../models/voter.model');
module.exports.adminLogin = async (req, res, next) => {
    try {
        const admin = await adminServices.Profile(req); // Pass only req
        
        if (!admin) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        const token = jwt.sign(
            { id: admin._id },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        // Set the token as a cookie
        res.cookie('token', token, {
            httpOnly: true, // Prevents client-side JavaScript from accessing the cookie
            //secure: process.env.NODE_ENV === 'production', // Ensures the cookie is sent over HTTPS in production
            sameSite: 'strict', // Prevents CSRF attacks
        });
        return res.status(200).json({ message: 'Login successfully', token });
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ message: error.message });
    }
};

module.exports.startElection = async (req, res, next) => {
    try{
        const {electionId}=req.body;
        const election=await electionModel.findById(electionId);
        if(!election){
            return res.status(404).json({message:'Election not found'});
        }
        election.startElection();
        await election.save();
        //set all voters ,voted option false..
        const voters = await voterModel.find({}, { descriptor: 0 }).sort({ username: 1 });
        console.log(voters);
        for(let i=0;i<voters.length;i++){
            voters[i].hasVoted=false;
            await voters[i].save();
        }
        console.log(voters);
        return res.status(200).json({message:'Election started successfully',election});
    }
    catch(err){
        console.log(err);
        return res.status(500).json({message:err.message});
    }
}