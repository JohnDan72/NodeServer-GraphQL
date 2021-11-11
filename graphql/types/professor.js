const { GraphQLObjectType, 
        GraphQLString,
        GraphQLID, 
        GraphQLBoolean, 
        GraphQLInt,
        GraphQLList, 
        } = require('graphql');
const { Course } = require('../../models/course');


const ProfessorType = new GraphQLObjectType({
    name: 'Professor',
    fields: () => ({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        age: {type: GraphQLInt},
        status: {type: GraphQLBoolean},
        date: {type: GraphQLString},
        courses: {
            // se realiza un require dinámico por conflicto de dependencias circulares
            type: new GraphQLList(require('./course').CourseType),
            resolve(parent , args){
                // se realiza un require dinámico por conflicto de dependencias circulares
                // return require("../database/data").courses.filter( course => course.professorId === parent.id)
                return Course.find({status: true , professorId: parent.id})
            }
        }
    })
});

module.exports = { ProfessorType };