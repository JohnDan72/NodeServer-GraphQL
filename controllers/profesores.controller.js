const { request, response } = require("express");



const getProfesores = (req = request , res = response) => {
    try {
        res.status(200).json({
            ok: true,
            msg: 'GET | Preofesores'
        });
    } catch (error) {
        return res.status(500).json({
            ok: false,
            errors: [{msg: `Error inesperado: ${error}`}]
        })
    }
}

module.exports = {
    getProfesores
}