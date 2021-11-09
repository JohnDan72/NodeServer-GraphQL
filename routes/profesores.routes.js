const { Router } = require("express");
const { graphqlHTTP } = require('express-graphql');

const { getProfesores } = require("../controllers/profesores.controller");
const schema = require('../models/course');

const router = Router();

router.use(graphqlHTTP({
    schema,
    graphiql: true,
}))

    router.get('/',[],getProfesores);

module.exports = {router};