const { Schema , model} = require('mongoose');

const ProfessorSchema = Schema({
    name: {
        type: String,
        required: [true , 'Nombre obligatorio'],
        unique: true
    },
    age: {
        type: Number,
        required: [ true , 'Edad requerida'],
    },
    status: {
        type: Boolean,
        default: true
    },
    date: {
        type: Date,
        default: Date.now
    },
});

const Professor = model('Professors', ProfessorSchema); 

module.exports = { Professor }