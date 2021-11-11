const { Professor } = require("../models/professor");



// GET professor by Id
const getProfessorById = async (parent , args) => {
    try {
        const professor = await Professor.findOne({_id: args.id , status:true});

        if(!professor){
            return {
                ok: false,
                errors: [{msg: `No existe profesor con id: ${args.id}`}]
            }
        }

        return {
            ok: true,
            msg: 'GET | professor By Id',
            professor,
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

// GET all professors
const getAllProfessors = async (parent , args) => {
    try {
        const [ professors , total ] = await Promise.all([
            Professor.find({status: true}),
            Professor.countDocuments({status: true})
        ])

        return {
            ok: true,
            msg: 'GET | professors',
            professors,
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

// CREATE professor
const createProfessor = async (parent , args) => {
    try {
        const { name , age } = args;

        // check if professor exists
        const existeProfessor = await Professor.findOne({name});
        if(existeProfessor){
            return {
                ok: false,
                errors: [{msg: `Este professor ya existe`}],
            }
        }

        // create a new professor
        const professor = new Professor({name , age});
        await professor.save();

        return {
            ok: true,
            msg: 'CREATE | professor',
            professor
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

// UPDATE professor
const updateProfessor = async (parent , args) => {
    try {
        const { id , name , age } = args;

        // check if professor exists and if name is new
        const [ professor , alreadyExists ] = await Promise.all([
            Professor.findOne({_id: id, status: true}),
            Professor.findOne({name})
        ]);
        if(!professor){
            return {
                ok: false,
                errors: [{msg: `Este professor NO existe`}],
            }
        }
        if(professor.name != name){
            if(alreadyExists){
                return {
                    ok: false,
                    errors: [{msg: `Ya existe un professor con este nombre`}],
                }
            }
        }

        // update professor
        professor.name = name;
        professor.age = age;
        await professor.save();

        return {
            ok: true,
            msg: 'UPDATE | professor',
            professor
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

// DELETE professor
const deleteProfessor = async (parent , args) => {
    try {
        const { id } = args;

        // check if professor exists
        const professor = await Professor.findOne({_id: id , status: true});

        if(!professor){
            return {
                ok: false,
                errors: [{msg: `Este professor NO existe`}],
            }
        }

        // delete professor
        professor.status = false;
        await professor.save();

        return {
            ok: true,
            msg: 'DELETE | professor',
            professor
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
    getProfessorById,
    getAllProfessors,
    createProfessor,
    updateProfessor,
    deleteProfessor,
}