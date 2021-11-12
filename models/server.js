const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../database/mongodb');
// const { validarJWT } = require('../middlewares/validacionJWT');

class Server{
    constructor(){
        this.app = express();
        this.endpoints = {
            cursos_db: '/api/cursos_db'
        }

        this.conectarMongoDB();
        this.middlewares();
        this.routes();
    }

    async middlewares(){
        this.app.use(cors()); // cors
        this.app.use(express.json()); // parse to json
        this.app.use(express.static("public")); // public dir static 
    }

    async conectarMongoDB(){
        await dbConnection();
    }

    routes(){
        this.app.use(this.endpoints.cursos_db,require('../routes/cursos_db.routes').router)
    }

    listen(){
        this.app.listen(process.env.PORT, () => {
            console.log(`Server listen on port: ${process.env.PORT}`);
        })
    }
}

module.exports = Server