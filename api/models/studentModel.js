import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const StudentSchema = new Schema({
    name: {
        type: String,
        required: 'Enter the name of the student'
    },
    age: {
        type: Number,
        required: 'Enter the age of the student'
    },
});

export default mongoose.model('Student', StudentSchema);