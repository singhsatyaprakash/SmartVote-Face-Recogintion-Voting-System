const express = require('express');
const router = express.Router();
const voterController = require('../controllers/voter.controllers');
const electionServices=require('../services/election.services');
const { body } = require('express-validator');
const Candidate = require('../models/candidate.model');
const candidateServices = require('../services/candidate.services');
const voterServices=require('../services/voter.services')

const voterRegisterDataValidation = [
    body('username')
        .notEmpty().withMessage('Username is required'),
        
    body('aadhaarNumber')
        .notEmpty().withMessage('Aadhaar number is required')
        .isLength({ min: 12, max: 12 }).withMessage('Aadhaar number must be 12 digits long')
        .matches(/^\d+$/).withMessage('Aadhaar number must contain only digits'),

    body('dob')
        .notEmpty().withMessage('Date of birth is required')
        .matches(/^\d{4}-\d{2}-\d{2}$/).withMessage('Date of birth must be in YYYY-MM-DD format'),

    body('age')
        .isInt({ min: 18 }).withMessage('User below 18 cannot register & not allowed to vote'),

    body('password')
        .notEmpty().withMessage('Password is required')
        .isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
        
    body('descriptor')
        .exists({ checkNull: true })
        .withMessage('Field is required and cannot be null')
];
const voterLoginDataValidation = [
    body('aadhaarNumber')
        .notEmpty().withMessage('Aadhaar number is required')
        .isLength({ min: 12, max: 12 }).withMessage('Aadhaar number must be 12 digits long')
        .matches(/^\d+$/).withMessage('Aadhaar number must contain only digits'),

    body('password')
        .notEmpty().withMessage('Password is required')
        .isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
];

router.post('/register-end', voterRegisterDataValidation, voterController.voterRegister)
        .post('/login',voterLoginDataValidation,voterController.voterLogin)
        .get('/electionlist',electionServices.getElectionList)
        .get('/getcandidate/:id',candidateServices.getCandidate)
        .get('/ongoingElection',electionServices.getOngoingElection)
        .get('/profile/:id',voterServices.getProfileById)
        .get('/getdescriptor/:id',voterServices.getdescriptor)
        .post('/store-vote',voterServices.isVoterById,voterController.storeVote)
        .post('/isAlreadyVoted',voterController.isAlreadyVoted)
module.exports = router;