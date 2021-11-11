const { Course } = require("../models/course");
const { Professor } = require("../models/professor");

// GET course by Id
const getCourseById = async (parent , args) => {
    try {
        const course = await Course.findOne({_id: args.id , status:true});

        if(!course){
            return {
                ok: false,
                errors: [{msg: `No existe curso con id: ${args.id}`}]
            }
        }

        return {
            ok: true,
            msg: 'GET | Course By Id',
            course,
        }
    } catch (error) {
        return {
            ok: false,
            errors: [
                {msg: `Error inesperado: ${error}`}
            ]
        }
    }
}

// GET all courses
const getAllCourses = async (parent , args) => {
    try {
        const [ courses , total ] = await Promise.all([
            Course.find({status: true}),
            Course.countDocuments({status: true})
        ])

        return {
            ok: true,
            msg: 'GET | Courses',
            courses,
            total
        }
    } catch (error) {
        return {
            ok: false,
            errors: [
                {msg: `Error inesperado: ${error}`}
            ]
        }
    }
}

// CREATE course
const createCourse = async (parent , args) => {
    try {
        const { name , language ,  professorId } = args;

        // check if course exists
        const existeCourse = await Course.findOne({name});
        if(existeCourse){
            return {
                ok: false,
                errors: [{msg: `Este curso ya existe`}],
            }
        }

        // check if professorId is correct
        const existeProfe = await Professor.findById(professorId);
        if(!existeProfe){
            return {
                ok: false,
                errors: [{msg: `El profesor no existe`}]
            }
        }

        // create a new course
        const course = new Course({name , language , professorId});
        await course.save();

        return {
            ok: true,
            msg: 'CREATE | course',
            course
        }
    } catch (error) {
        return {
            ok: false,
            errors: [
                {msg: `Error inesperado: ${error}`}
            ]
        }
    }
}

// UPDATE course
const updateCourse = async (parent , args) => {
    try {
        const { id , name , language } = args;

        // check if course exists and if name is new
        const [ course , alreadyExists ] = await Promise.all([
            Course.findOne({_id: id, status: true}),
            Course.findOne({name})
        ]);
        if(!course){
            return {
                ok: false,
                errors: [{msg: `Este curso NO existe`}],
            }
        }
        if(course.name != name){
            if(alreadyExists){
                return {
                    ok: false,
                    errors: [{msg: `Ya existe un curso con este nombre`}],
                }
            }
        }

        // update course
        course.name = name;
        course.language = language;
        await course.save();

        return {
            ok: true,
            msg: 'UPDATE | course',
            course
        }
    } catch (error) {
        return {
            ok: false,
            errors: [
                {msg: `Error inesperado: ${error}`}
            ]
        }
    }
}

// DELETE course
const deleteCourse = async (parent , args) => {
    try {
        const { id } = args;

        // check if course exists
        const course= await Course.findOne({_id: id , status: true});

        if(!course){
            return {
                ok: false,
                errors: [{msg: `Este curso NO existe`}],
            }
        }

        // delete course
        course.status = false;
        await course.save();

        return {
            ok: true,
            msg: 'DELETE | course',
            course
        }
    } catch (error) {
        return {
            ok: false,
            errors: [
                {msg: `Error inesperado: ${error}`}
            ]
        }
    }
}


module.exports = {
    getCourseById,
    getAllCourses,
    createCourse,
    updateCourse,
    deleteCourse
}