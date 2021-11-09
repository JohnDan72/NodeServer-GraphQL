const { request, response } = require("express");
const { graphqlHTTP } = require('express-graphql');
const schema = require('../models/course');



const getProfesores = () => {
     graphqlHTTP({
        schema,
        graphiql: true,
    });
    return;
    // try {
    //     res.status(200).json({
    //         ok: true,
    //         msg: 'GET | Preofesores'
    //     });
    // } catch (error) {
    //     return res.status(500).json({
    //         ok: false,
    //         errors: [{msg: `Error inesperado: ${error}`}]
    //     })
    // }
}

module.exports = {
    getProfesores
}