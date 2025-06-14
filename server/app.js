const dotenv=require('dotenv');
dotenv.config();
const express=require('express');
const morgan=require('morgan');
const cors=require('cors');
const cookieParser = require('cookie-parser');

const app=express();

const path=require('path');

const connectDB=require('./config/db');
connectDB();
const adminRouter=require('./routes/admin.route');
const voterRouter=require('./routes/voter.route');



const electionStatusScheduler=require('./Script/electionStatusScheduler');
const resultServices=require('./services/result.services');

app.set('view engine', 'ejs');
// Set custom views folder
//middlewares...
app.use(cors({
    origin:process.env.CLIENT_URL,
    credentials:true
})); //at last check out the cors options at time of cookies...


app.use(cookieParser());
app.use(morgan('dev'));//print request, route, responseStatus, timeTaken to send...
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use(express.static(path.join(__dirname, '../client/dist')));
app.use(express.static('public'));


app.use('/admin',adminRouter);
app.use('/voter',voterRouter);


app.get('/result',resultServices.getResultList);

// Handle all other routes with index.html (for React Router)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/dist/index.html'));
});

app.listen(process.env.PORT,()=>{
    console.log(`Server is running on port ${process.env.PORT}...`);
})