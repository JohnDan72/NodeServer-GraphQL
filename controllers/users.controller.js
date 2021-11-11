const { User } = require("../models/user");
const bcrypt = require('bcrypt');

// GET user by Id
const getUserById = async (parent , args) => {
    try {
        const user = await User.findById(args.id);

        if(!user){
            return {
                ok: false,
                errors: [{msg: `No existe user con id: ${args.id}`}]
            }
        }

        return {
            ok: true,
            msg: 'GET | user By Id',
            user,
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

// GET all users
const getAllUsers = async (parent , args) => {
    try {
        const [ users , total ] = await Promise.all([
            User.find({status: true}),
            User.countDocuments({status: true})
        ])

        return {
            ok: true,
            msg: 'GET | users',
            users,
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

// CREATE new user
const createUser = async (parent , args) => {
    try {
        const { name , email , password } = args;
        // check if is new
        const existeUser = await User.findOne({email});
        if(existeUser){
            return {
                ok: false,
                errors: [{msg: `Ya existe un user con este email`}]
            }
        }
        
        const newUser = new User({ name , email , password });
        // encrypting password
        const salt = bcrypt.genSaltSync();
        newUser.password = bcrypt.hashSync(password, salt);

        await newUser.save();

        return {
            ok: true,
            msg: 'User created success!',
            user: newUser,
            token: 'token new 123'
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

// UPDATE user
const updateUser = async (parent , args) => {
    try {
        const { id , name , email , password } = args;

        // check if user exists and if email is new
        const [ user , alreadyExists ] = await Promise.all([
            User.findOne({_id: id, status: true}),
            User.findOne({email})
        ]);
        if(!user){
            return {
                ok: false,
                errors: [{msg: `Este user NO existe`}],
            }
        }
        if(user.email != email){
            if(alreadyExists){
                return {
                    ok: false,
                    errors: [{msg: `Ya existe un user con este email`}],
                }
            }
        }

        // encrypting password
        const salt = bcrypt.genSaltSync();
        
        // update user
        user.name = name;
        user.email = email;
        user.password = bcrypt.hashSync(password, salt);

        await user.save();

        return {
            ok: true,
            msg: 'UPDATE | user',
            user
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

// DELETE user
const deleteUser = async (parent , args) => {
    try {
        const { id } = args;

        // check if user exists
        const user = await User.findOne({_id: id , status: true});

        if(!user){
            return {
                ok: false,
                errors: [{msg: `Este user NO existe`}],
            }
        }

        // delete user
        user.status = false;
        await user.save();

        return {
            ok: true,
            msg: 'DELETE | user',
            user
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
    getUserById,
    getAllUsers,
    createUser,
    updateUser,
    deleteUser
}
