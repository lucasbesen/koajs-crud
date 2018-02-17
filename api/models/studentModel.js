'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let StudentSchema = new Schema({
    name: {
        type: String,
        required: 'Enter the name of the student'
    },
    age: {
        type: Number,
        required: 'Enter the age of the student'
    },
});

module.exports = mongoose.model('Student', StudentSchema);