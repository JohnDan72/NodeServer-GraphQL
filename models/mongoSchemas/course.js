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

CourseSchema.methods.toJSON = function (){
    const { __v , _id , status , ...course} = this.toObject();
    course.uid = _id;
    return course;
}

module.exports = model('Courses', CourseSchema);