import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const toDoSchema = new Schema({
    itemId: Number,
    item: String,
    completed: Boolean
}, {collection:"TodoList"});

const ToDo = mongoose.model('ToDo', toDoSchema);

export default ToDo