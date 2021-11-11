const { Schema, model } = require("mongoose");


const CourseSchema = Schema({
    name: {
        type: String,
        required: [ true , 'Nombre obligatorio'],
        unique: true
    },
    language: {
        type: String,
        required: [ true , 'Language obligatorio'],
    },
    date: {
        type: Date, 
        default: Date.now 
    },
    professorId: {
        type: Schema.Types.ObjectId,
        ref: 'Professors',
        required: [ true , 'Foreign key error']
    },
    status: {
        type: Boolean,
        default: true
    }

});

const Course = model('Courses', CourseSchema);

module.exports = { Course }