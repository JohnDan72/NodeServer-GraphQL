const { Schema, model } = require("mongoose");


const UserSchema = Schema({
    name: {
        type: String,
        required: [ true , 'name required'],
    },
    email: {
        type: String,
        required: [ true , 'email required'],
        unique: true
    },
    password: {
        type: String,
        required: [ true , 'password required'],
    },
    date: {
        type: Date,
        default: Date.now
    },
    status:{
        type: Boolean,
        default: true
    }
});

const User = model('Users', UserSchema);

module.exports = { User };