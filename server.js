const cors = require('cors');
const app = require('express')();
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

//set up port
const PORT = process.env.PORT || 3000;


dotenv.config();

//get routes
const authRouter = require('./Authentication/auth.route');
const userRouter = require('./User/user.route');
const classroomRouter = require('./Classroom/classroom.routes');

//connect database
const DB_URI = process.env.DB_URI;
mongoose.connect(DB_URI,()=>{
    console.log(`Connected to database`);
});


//initialize helper libraries
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cors());


// Setup routes
app.use('/api/admin',authRouter);
app.use('/api/user',userRouter);
app.use('/api/classroom',classroomRouter);

app.listen(PORT,()=>{
    console.log(`listening or port: ${PORT}`);
})



