const { GraphQLObjectType , GraphQLString, GraphQLID, GraphQLBoolean } = require('graphql');
// // static data
// const { professors } = require('../database/data');

// models
const Professor = require('./mongoSchemas/professor');

const CourseType = new GraphQLObjectType({
    name: 'Course',
    fields: () => ({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        language: {type: GraphQLString},
        date: {type: GraphQLString},
        status: { type: GraphQLBoolean},
        professor: { //like populate
            type: require('./professor').ProfessorType,
            resolve(parent , args){
                return Professor.findById( parent.professorId );
            }
        }
    })
});

module.exports = { CourseType };