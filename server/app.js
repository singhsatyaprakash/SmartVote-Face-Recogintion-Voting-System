const dotenv=require('dotenv');
dotenv.config();
const express=require('express');
const app=express();

const path=require('path');

const connectDB=require('./config/db');

app.set('view engine', 'ejs');
// Set custom views folder
app.set('views', path.join(__dirname, '../client/src/pages'));

//middlewares...
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({extended:true}));

//voter..


///admin




app.get("/check",(req,res)=>{
    res.render('index')
})

app.get('/home',(req,res)=>{
    res.send('Home page');
})
app.listen(process.env.PORT,()=>{
    console.log(`Server is running on port ${process.env.PORT}...`);
})