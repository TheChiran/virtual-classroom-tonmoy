const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    username:{
        type: String,
        required: true,
        min: 6,
        max: 20
    },
    email:{
        type: String,
        required: true,
        min: 6,
        max: 20
    },
    password:{
        type: String,
        required: true,
        min: 6,
        max: 20
    },
    role:{
        type: String,
        required: true,
        min: 6,
        max: 20
    }
});

module.exports = mongoose.model('User',userSchema);