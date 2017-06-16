'use strict';
const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const MovieSchema = new Schema({
    title: {
        type: String,
        required: [true, 'Title is required']
    },
    description: {
        type: String,
        required: [true, 'Description is required']
    },
    created_date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Movies', MovieSchema);