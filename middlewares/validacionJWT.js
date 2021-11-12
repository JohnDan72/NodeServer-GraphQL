const { request, response } = require("express");
const { User } = require("../models/user");
const jwt = require('jsonwebtoken');

const validarJWT = async (req=request, res=response, next) => {
    // leer el token
    const tokenAcceso = req.header('Authorization');
    // console.log(tokenAcceso);
    //  verificar el token
    if(!tokenAcceso){
        req.user = { 
            auth: false,
            errors: [{msg: `Token missed`}]
        };
        return next();
    }

    try {
        const payload = jwt.verify( tokenAcceso , process.env.JWT_SECRETE_KEY);

        

        req.user = await User.findById(payload.uid);
        req.user.auth = true;
        
        return next();
    } catch (error) {
        req.user = { 
            auth: false,
            errors: [{msg: `Token inválido`}]
        };
        return next();
    }

}

module.exports = {
    validarJWT
}