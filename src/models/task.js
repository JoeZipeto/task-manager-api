const mongoose = require('mongoose')
const validator = require('validator')
const { ObjectID } = require('mongodb')
const { request } = require('express')

const taskSchema = new mongoose.Schema({
    description: {
        type: String,
        required: true,
        trim: true
    }, 
    completed: {
        type: Boolean,
        default: false
    },
    owner: {
        type: mongoose.Schema.Types.ObjectID,
        required: true,
        ref:'User'
    }
}, { timestamps: true })

const Task = mongoose.model('Task',taskSchema )

module.exports = Task