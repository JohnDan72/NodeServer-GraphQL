const express = require('express');
const cors = require('cors');
const router = require('../routes/profesores.routes');

const schema = require('../database/config');
const { graphqlHTTP } = require('express-graphql');
const { dbConnection } = require('../database/mongodb');

class Server{
    constructor(){
        this.app = express();
        this.endpoints = {
            profesores: '/api/cursos_db'
        }

        this.conectarMongoDB();
        this.middlewares();
        this.routes();
    }

    middlewares(){
        this.app.use(cors()); // cors
        this.app.use(express.json()); // parse to json
        this.app.use(express.static("public")); // public dir static
    }

    async conectarMongoDB(){
        await dbConnection();
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