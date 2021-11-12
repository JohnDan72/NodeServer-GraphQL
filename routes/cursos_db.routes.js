const { Router, request } = require("express");
const { graphqlHTTP } = require('express-graphql');

// const { getProfesores } = require("../controllers/profesores.controller");
const schema = require('../graphql/schemas/main');
const { validarJWT } = require("../middlewares/validacionJWT");

const router = Router();

    router.use(validarJWT); //validación de JWT
    router.use('/',graphqlHTTP((req=request) => {
        return {
            schema,
            context: {
                user: req.user
            }
        }
    }));

module.exports = {router};