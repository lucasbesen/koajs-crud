'use strict';

const mongoose = require('mongoose');
let Student = mongoose.model('Student');

exports.list_all_students = async (ctx, next) => {
    var student = await Student.find({});
    ctx.body = student;
};

exports.create_a_student = async (ctx, next) => {
    var new_student = new Student(ctx.request.body);
    await new_student.save();
    ctx.body = new_student;
};

exports.read_a_student = async (ctx, next) => {
    var student = await Student.findById(ctx.params.studentId);
    ctx.body = student;
};

exports.update_a_student = async (ctx, next) => {
    var student = await Student.findOneAndUpdate({_id: ctx.params.studentId}, ctx.request.body, {new: true});
    ctx.body = student;
};

exports.delete_a_student = async (ctx, next) => {
    var student = await Student.remove({_id: ctx.params.studentId});
    ctx.body = {message: 'Student successfully deleted'};
};