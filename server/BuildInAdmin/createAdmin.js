const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bcrypt = require('bcrypt');
const adminModel = require('../models/admin.model');
const connectDB = require('../config/db'); // Import the updated connectDB function
dotenv.config();

const saltRounds = 10;

const hashPassword = async (password) => {
    try {
        const salt = await bcrypt.genSalt(saltRounds);
        //console.log(salt);
        const hashedPassword = await bcrypt.hash(password, salt);
        //console.log(hashedPassword);
        return hashedPassword;
    } catch (error) {
        console.log("Error hashing password:", error);
        throw error;
    }
};

const CreateAdmin = async () => {
    try {
        await connectDB(); // Ensure the database is connected
        const hashedPassword = await hashPassword(process.env.ADMIN_PASSWORD);
        const defaultAdmin = await adminModel.create({
            userID: process.env.ADMIN_USERID,
            username: process.env.ADMIN_USERNAME,
            password: hashedPassword,
            email: process.env.ADMIN_EMAIL,
        });
        //console.log(defaultAdmin)
        await defaultAdmin.save();
        console.log("Default admin created successfully:", defaultAdmin);
    } catch (error) {
        // console.log(error);
       console.log("Failed to create admin:", error.errmsg);
       if(error.code===11000){
        console.log("Admin already exists...");
       }
    } finally {
        mongoose.connection.close(); // Close the database connection
    }
};

CreateAdmin();