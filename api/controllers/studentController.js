'use strict';

const mongoose = require('mongoose');
let Student = mongoose.model('Student');

exports.list_all_students = async (ctx, next) => {
    try {
        var student = await Student.find({});
        ctx.body = student;
    } catch (err) {
        ctx.status = err.status || 500;
        ctx.body = err.message;
    }
};

exports.create_a_student = async (ctx, next) => {
    try {
        var new_student = new Student(ctx.request.body);
        await new_student.save();
        ctx.body = new_student;   
    } catch (err) {
        ctx.status = err.status || 500;
        ctx.body = err.message;
    }
};

exports.read_a_student = async (ctx, next) => {
    try {
        var student = await Student.findById(ctx.params.studentId);
        ctx.body = student;
    } catch (error) {
        ctx.status = err.status || 500;
        ctx.body = err.message;
    }
};

exports.update_a_student = async (ctx, next) => {
    try {
        var student = await Student.findOneAndUpdate({_id: ctx.params.studentId}, ctx.request.body, {new: true});
        ctx.body = student;
    } catch (error) {
        ctx.status = err.status || 500;
        ctx.body = err.message;
    }
};

exports.delete_a_student = async (ctx, next) => {
    try {
        var student = await Student.remove({_id: ctx.params.studentId});
        ctx.body = {message: 'Student successfully deleted'};   
    } catch (error) {
        ctx.status = err.status || 500;
        ctx.body = err.message;
    }
};