const mongoose=require('mongoose');
const dotenv=require('dotenv');
dotenv.config();

const adminSchema=new mongoose.Schema({
    userID:{
        type:Number,
        required:true,
        unique:true,
    },
    username:{
        type:String,
        required:[true,"Please enter a username"],
        minlength:[3,"Username should be at least 3 characters"],
        //maxlength:[20,"Username should be at most 20 characters"],
        trim:true,
        lowercase:true,
        unique:[true,"Username already exists"],
        match:[/^[a-zA-Z0-9]+$/, "Username should only contain alphanumeric characters"]
    },
    password:{
        type:String,
        minlength:[6,"Password should be atleast 6 characters"],
        //maxlength:[20,"Username should be at most 20 characters"],
        trim:true,
        required:true,
    },
    email:{
        type:String,
        required:[true,"Please enter an email"],
        unique:[true,"Email already exists"],
        match:[/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, "Please enter a valid email address"],
        lowercase:true,
        trim:true,
    }
});

const admin=mongoose.model('Admin',adminSchema);

module.exports=admin;