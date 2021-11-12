const { User } = require("../models/user");
const bcrypt = require("bcrypt");
const { generarJWT } = require("../helpers/jwt");

const login = async (parent,args) => {
    try {
        const { email , password } = args;

        // check if user exists
        const user = await User.findOne({ email, status: true });
        if(!user){
            return {
                ok: false,
                errors: [{msg: 'Correo o contraseña inválido 1'}]
            };
        }

        // checar la contraseña
        const validPassword = bcrypt.compareSync( password , user.password );
        if(!validPassword){
            return {
                ok: false,
                errors: [{msg: 'Correo o contraseña inválido 2'}]
            };
        }
        // generar un JWT
        const token = await generarJWT(user._id);
        // const token = 'token123456789';

        return {
            ok: true,
            msg: 'POST | Login',
            token,
            user,
        };
    } catch (error) {
        return {
            ok: false,
            errors: [{msg: `Error inesperado: ${error}`}]
        }
    }
}

module.exports = {
    login,
}