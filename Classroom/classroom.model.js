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
    results:[{
        student: {
            type: Schema.Types.ObjectId,
            ref: "User"
        },
        grade: {
            type: Number
        }
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
    isActive:{
        type: Boolean,
        required: true,
        default: true
    }
});

module.exports = mongoose.model('Classroom',classroomSchema);