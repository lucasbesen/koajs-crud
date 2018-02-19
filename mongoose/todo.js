var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var toDoSchema = new Schema({
    itemId: Number,
    item: String,
    completed: Boolean
}, {collection:"TodoList"});

module.exports = mongoose.model('ToDo', toDoSchema);;