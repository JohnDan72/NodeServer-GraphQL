const { GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLID, GraphQLInt, GraphQLBoolean, GraphQLList } = require("graphql");
const { CourseType } = require("../models/course");
const { ProfessorType } = require("../models/professor");
const { UserType } = require("../models/user");

// static data
const { courses, professors , users } = require("./data");


const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields:{
        // courses
        course: {
            type: CourseType,
            args: {
                id: {type: GraphQLString},
            },
            resolve(parent , args){
                return courses.find( curso => curso.id === args.id );
            }
        },
        courses: {
            type: new GraphQLList(CourseType),
            resolve(parent, args){
                return courses
            }
        },
        // professors
        professor: {
            type: ProfessorType,
            args: {
                id: {type: GraphQLString},
            },
            resolve(parent , args){
                return professors.find( profe => profe.id === args.id );
            }
        },
        professors: {
            type: new GraphQLList(ProfessorType),
            resolve(parent , args){
                return professors;
            }
        },
        // users
        user: {
            type: UserType,
            args: {
                id: {type: GraphQLString},
            },
            resolve(parent , args){
                return users.find( user => user.id === args.id );
            }
        },
        users: {
            type: new GraphQLList(UserType),
            resolve(parent , args){
                return users
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery
});