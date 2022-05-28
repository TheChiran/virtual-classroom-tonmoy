const cors = require('cors');
const app = require('express')();
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cloudinary = require('cloudinary').v2;

//set up port
const PORT = process.env.PORT || 3000;


dotenv.config();

// Cloudinary Configuration
cloudinary.config({ 
    cloud_name: 'dzywuv120', 
    api_key: '383977439748697', 
    api_secret: 'N_66lZPmjQqdEkx0Rcs5iKHnimg' 
});

//get routes
const authRouter = require('./Authentication/auth.route');
const userRouter = require('./User/user.route');
const classroomRouter = require('./Classroom/classroom.routes');
const postRouter = require('./Post/post.routes');

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
app.use('/api/post',postRouter);

app.get('/',(req,res)=>{
    res.status(200).send({message: 'Hello world'});
})

app.listen(PORT,()=>{
    console.log(`listening or port: ${PORT}`);
})



