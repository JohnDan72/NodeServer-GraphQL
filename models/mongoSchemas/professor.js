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

ProfessorSchema.methods.toJSON = function(){
    const {__v , _id , ...profe} = this.toObject();
    profe.uid = _id;
    return profe;
}

module.exports = model('Professors', ProfessorSchema);