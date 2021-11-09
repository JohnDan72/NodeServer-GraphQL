const express = require('express');
const cors = require('cors');
const router = require('../routes/profesores.routes');

const schema = require('../models/course');
const { graphqlHTTP } = require('express-graphql');

class Server{
    constructor(){
        this.app = express();
        this.endpoints = {
            profesores: '/api/profes'
        }

        this.middlewares();
        this.routes();
    }

    middlewares(){
        // cors
        this.app.use(cors());
        // parse to json
        // this.app.use(express.json());
        // public dir static
        this.app.use(express.static("public"));
    }

    routes(){
        this.app.use('/graphql',graphqlHTTP({
            schema,
            graphiql: true,
        }))
        this.app.use(this.endpoints.profesores,require('../routes/profesores.routes').router)
    }

    listen(){
        this.app.listen(process.env.PORT, () => {
            console.log(`Server listen on port: ${process.env.PORT}`);
        })
    }
}

module.exports = Server