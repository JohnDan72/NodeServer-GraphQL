const { GraphQLObjectType , GraphQLString, GraphQLID } = require('graphql');
// const { ProfessorType } = require('./professor');
// static data
const { professors } = require('../database/data');

const CourseType = new GraphQLObjectType({
    name: 'Course',
    fields: () => ({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        language: {type: GraphQLString},
        date: {type: GraphQLString},
        professorId: {type: GraphQLID},
        professor: { //like populate
            type: require('./professor').ProfessorType,
            resolve(parent , args){
                return professors.find( profe => profe.id === parent.professorId)
            }
        }
    })
});

module.exports = { CourseType };