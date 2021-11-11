const { Router } = require("express");
const { graphqlHTTP } = require('express-graphql');

// const { getProfesores } = require("../controllers/profesores.controller");
const schema = require('../graphql/schemas/main');

const router = Router();


    router.use('/',graphqlHTTP({
        schema,
        graphiql: true,
    }));

module.exports = {router};