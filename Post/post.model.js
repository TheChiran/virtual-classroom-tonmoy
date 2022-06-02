const { Schema, Date } = require('mongoose');
const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    classroom: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    marks:[{
        student: {
            type: Schema.Types.ObjectId,
            ref: "User"
        },
        mark: {
            type: Number
        }
    }],
    type:{
        type: String,
        required: true,
        max: 20
    },
    isActive:{
        type: Boolean,
        required: true,
        default: true
    },
    deadline:{
        date: {
            type: Date,
            required: true
        },
        time: {
            type: String,
            required: true
        }
    },
    answers:[{
        student: {
            type: Schema.Types.ObjectId,
            ref: "User"
        },
        answer: [{
            type: String,
            required: true
        }]
    }],
});

module.exports = mongoose.model('Post',postSchema);