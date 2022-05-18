const { Schema } = require('mongoose');
const mongoose = require('mongoose');

const classroomSchema = new mongoose.Schema({
    teacher:{
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    created_by:{
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    students:[{
        type: Schema.Types.ObjectId,
        ref: "User",
        required: false
    }],
    posts:[{
        type: Schema.Types.ObjectId,
        ref: "Post",
        required: false
    }],
    name:{
        type: String,
        required: true,
        min: 6,
        max: 20
    },
    code:{
        type: String,
        required: true,
        min: 6
    },
    subject:{
        type: String,
        required: true,
        min: 6,
        max: 20
    },
});

module.exports = mongoose.model('Classroom',classroomSchema);