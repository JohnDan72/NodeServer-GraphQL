const { Router } = require("express");
const { graphqlHTTP } = require('express-graphql');

// const { getProfesores } = require("../controllers/profesores.controller");
const schema = require('../database/config');

const router = Router();


    router.use('/',graphqlHTTP({
        schema,
        graphiql: true,
    }));

module.exports = {router};