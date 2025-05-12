const express=require('express');
const router=express.Router();
const {AuthenticateAdminProfile}=require('../middlewares/admin.middleware');
const adminController=require('../controllers/admin.contollers');
const voterServices=require('../services/voter.services');
const candidateSevices=require('../services/candidate.services');
const {body}=require('express-validator');
const electionModel=require('../models/election.model');
const electionServices=require('../services/election.services');
const adminServices=require('../services/admin.services');


const verifyAdminData=[
    body('userID').notEmpty().withMessage('Please enter the userId'),
    body('email').isEmail().withMessage('Please enter a valid email'),
    body('password').isLength({min:6}).withMessage('Password should be at least 6 characters')
];
const verifyCandidateData=[
    body('name').notEmpty().withMessage('Please enter the name of the candidate'),
    body('party').notEmpty().withMessage('Please enter the party of the candidate'),
    body('symbolUrl')
        .notEmpty()
        .withMessage('Please enter the symbol URL of the candidate')
        .isURL()
        .withMessage('Please enter a valid URL'),
    body('aadhaar')
        .notEmpty()
        .withMessage('Please enter the Aadhaar number')
        .isLength({ min: 12, max: 12 })
        .withMessage('Aadhaar number must be 12 digits')
        .isNumeric()
        .withMessage('Aadhaar number must contain only numbers')
];

router.post('/login',verifyAdminData,AuthenticateAdminProfile,adminController.adminLogin)
      .get('/profile/:id',adminServices.getProfileById)
      .get('/voterlist',voterServices.voterList)
      .post('/create-election',electionServices.createElection)
      .get('/electionlist',electionServices.getElectionList)
      .post('/addCandidate/:electionId',verifyCandidateData,voterServices.isVoter,candidateSevices.addCandidate)
      .get('/getCandidate/:electionId',electionServices.getCandidate)
      .post('/reset-votes', electionServices.resetVotes)
      .post('/start-election',adminController.startElection)


module.exports=router;